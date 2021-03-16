---
layout: article
title: Advanced Reporting with the NeoLoad CLI
category: Reporting
permalink: /tutorials/cli-report
support: Neotys
contributors:
- text: Neotys
  url: https://neotys.com
- text: Paul Bruce
  url: https://github.com/paulsbruce
documentation:
- https://github.com/Neotys-Labs/neoload-cli#the-test-results-vs-report-subcommands
repo:
- https://github.com/Neotys-Labs/neoload-cli
---

The NeoLoad Command Line Interface (CLI) can produce custom reports based on test
 result data streamed to NeoLoad Web.

 <div class="video-container-16x9">
    <video class="video" video autoplay loop muted playsinline>
        <source src="/_pages/tutorials/cli-report/images/CLI-reporting-snap.webm" type="video/webm">
        Sorry, your browser doesn't support embedded WEBM videos.
    </video>
 </div>

# TL;DR
```
# one time only
pip install neoload
neoload login $NLW_TOKEN

# select a test to report on
neoload test-results use [test_result_name_or_guid]

# export data
neoload report --template=builtin:transactions-csv > transactions.csv
```

<div style="font-size:0.7em;margin-top:1em;margin-bottom:1em;">

A simple CSV export command produces something like:

<div style="font-size:0.9em; background-color:#eee;">
User Path;Element;Parent;Count;Min;Avg;Max;Perc 50;Perc 90;Perc 95;Perc 99;Success;Success Rate;Failure;Failure Rate
kamoulox;transaction_A;Actions;2736;0.084;0.14;1.476;0.101;0.262;0.372;0.595;35;1.279;2701;98.721
kamoulox;transaction_B;Actions;2733;0.059;0.099;1.425;0.072;0.165;0.266;0.482;34;1.244;2699;98.756
kamoulox;transaction_C;Actions;2727;0.058;0.099;1.421;0.072;0.157;0.272;0.479;31;1.137;2696;98.863
kamoulox;transaction_D;Actions;2734;0.058;0.098;1.062;0.072;0.173;0.272;0.442;30;1.097;2704;98.903
</div>
</div>

# Custom Reporting Templates

You can also provide custom Jinja templates to produce HTML or other text-based
 output formats. Common use cases are:

* A custom single-file HTML report that can be attached to email or chat messages
* Raw data extracts formatted for import into other tools and platforms
* Multiple outputs for different teams or analysis processes

Examples:

```
neoload report --template tests/resources/jinja/sample-custom-report.html.j2 > ~/report.html

# or

neoload report --out-file ~/temp.json
neoload report --json-in ~/temp.json --template /path/to/a/jinja/devs.j2 > ~/teamA.html
neoload report --json-in ~/temp.json --template /path/to/a/jinja/ops.j2 > ~/teamB.html
neoload report --json-in ~/temp.json --template /path/to/a/jinja/dbas.j2 > ~/teamC.html
```
Some simple examples of custom HTML reports can be found here:
* <a href="/_pages/tutorials/cli-report/example-output-single.html" use-same-tab="false">Single-test Summary (HTML)</a>
* <a href="/_pages/tutorials/cli-report/example-output-trends.html" use-same-tab="false">Transaction Trends (HTML)</a>

# Additional Capabilities

Beyond basic exports, the CLI 'report' command provides additional capabilities, such as:

* [Filtering data by timespan](https://github.com/Neotys-Labs/neoload-cli#filtering-export-data-by-timespan) (e.g. only export 'steady state' section of data)
* [Filtering data by element name](https://github.com/Neotys-Labs/neoload-cli#filtering-export-data-by-element), useful when producing comparisons on:
  * specific transactions (e.g. login, checkout, submit claim/order)
  * specific requests such as from a particular service or known issue area
* [Combining filters](https://github.com/Neotys-Labs/neoload-cli#combining-timespan-and-element-filters)
* [Exporting JSON and applying multiple templates](https://github.com/Neotys-Labs/neoload-cli#exporting-all-test-data-and-using-custom-templates)
* [Building test-over-test trend comparisons](#building-comparisons-and-test-over-test-trends)

# Building Comparisons and Test-over-test Trends

The NeoLoad CLI also helps you create multi-test results JSON aggregates. Consider:

```
neoload report --type=trends --filter="results=-4" \
               --template tests/resources/jinja/sample-trends-report.html.j2
```

In this case, the NeoLoad CLI will consider the currently used test-result as the basis
 for the filter value of -4 which means "find results with the same project and scenario
 as the current result, and pull the last four (if that many exist) in chronological order."

The above example is using Sample Jinja Templates from the NeoLoad CLI source repo.
  This is a good basis if you want to construct your own templates, and we encourage
  you to clone the NeoLoad CLI repo to get a copy of these templates. Once you do,
  you will probably want to make a copy of the jinja folder and customize that.

# Comparing Specific Results

You can also use specific test-result GUIDs as results, pipe-delimited:

```
neoload report --type=trends --filter="results=9ae019b2-27b4-4598-8db1-8369e277ff4b|d27bc9cd-9e3c-4f1e-8167-2f1e7554f5ec"
```

This is often useful when comparing the current test run with other known baselines.
 After you run a test via the CLI, that latest test run is automatically selected
 as the current test-result your CLI is referring to. Therefore, if comparing to
 a baseline, you only need to provide the baseline test-result GUID in the filter above.

# Trending Based on Specific Results Criteria

The NeoLoad CLI test-results list ('ls') command produces JSON which you can process
 via standard tools like [jq](https://stedolan.github.io/jq/). You can filter CLI results based on your own specific
 filtering criteria and then turn them in to a delimited list for use by the CLI
 report filter results specifier:

```
PROJECT=rest_api
SCENARIO=fullTest

# compile a CSV list of GUIDs based on specific project, scenario, execution status
GUIDS=$(neoload test-results --filter="project=$PROJECT|status=TERMINATED|scenario=$SCENARIO" ls \
              | jq '.[:5][]|.id' -r | tr '\n' '|')

neoload report --type=trends --filter="results=$GUIDS" \
               --template tests/resources/jinja/sample-trends-report.html.j2
```
