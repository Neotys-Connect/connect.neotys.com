---
layout: article
title: Integrating NeoLoad and Dynatrace
category: Integrations
permalink: /tutorials/dynatrace-and-neoload
support: Neotys
contributors:
- text: Neotys
  url: https://neotys.com
academy:
- https://academy.neotys.com/courses/foradvancedusers/lessons/how-to-integrate-neoload-and-dynatrace/
documentation:
- https://www.neotys.com/documents/doc/neoload/latest/6153.htm
videos:
- url: https://www.youtube.com/watch?v=2e9-Y8K8IGg&t=31m50s
  image: https://img.youtube.com/vi/2e9-Y8K8IGg/0.jpg
---

NeoLoad and Dynatrace can work together to provide a shared view of the impact a load test has on the systems under test.

The NeoLoad module for Dynatrace makes it possible to:

- send data to correlate the NeoLoad requests with the code analysis in Dynatrace
- get metrics from Dynatrace to correlate the monitoring data and graph infrastructure performance directly into Neoload and Neoload Web

# What you get from integrating NeoLoad with Dynatrace

In plain speak, you get better context in both tools...NeoLoad data and events in Dynatrace
 and Dynatrace resource monitoring data in NeoLoad, both timeseries correlated. This
 dramatically simplifies the process of identifying causes and patterns from either/both
 platform because they are using the same sources of truth.

Service and host metrics in NeoLoad:

![Service and host metrics in NeoLoad](https://github.com/Neotys-Labs/Dynatrace/raw/master/screenshots/neoload_external_data_graphs.png)

NeoLoad Test start and end Events in services and hosts

![NeoLoad Test start and end Events in services and hosts](https://github.com/Neotys-Labs/Dynatrace/raw/master/screenshots/dynatrace_consult_event.png)

# How to set it up

- [Enabling the Dynatrace integration](https://www.neotys.com/documents/doc/neoload/latest/5896_1.htm)
  - [in Dynatrace](https://www.neotys.com/documents/doc/neoload/latest/#5896_1.htm#o39900)
  - [in your NeoLoad Project](https://www.neotys.com/documents/doc/neoload/latest/#5896_1.htm#o39901)
  - [in your NeoLoad scenario](https://www.neotys.com/documents/doc/neoload/latest/#5896_1.htm#o39902)

# Configuration Q&A

Q: Why don't I see anything show up from Dynatrace in NeoLoad Runtime Graphs Monitors?

* A: You need to add a manual tag to at least one service in Dynatrace that is affected by the load test.
 These tags are also case-sensitive.

Q: Why do I see way more services and hosts than I've tagged under NeoLoad Runtime Graphs?

* A: The NeoLoad Dynatrace integration uses the tags you've manually added to services as
 an entry point of sorts. From that, it uses the Smartscape Topology in Dynatrace to include
 all other affected services and hosts (auto-discovery).

Q: If I have no access to Dynatrace, can I still configure NeoLoad?

* Kind of, yes, but you need a Dynatrace admin to get you:
  - A proper API access token
  - Set up request attributes rules
  - Add appropriate tags to services you plan to test

In most cases, it makes sense for you (performance person) to have at least read-only access
 to Dynatrace, and then work with your Admin to set up the rest. You can also schedule time
 with your Neotys account rep or Customer Success team to help configure it.

# Additional Info and Documentation

Please see the links on the side of this article for more information.
