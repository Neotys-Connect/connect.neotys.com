---
layout: article
title: Integrating Selenium and NeoLoad
category: Integrations
permalink: /tutorials/selenium-and-neoload
support: Neotys
contributors:
- text: Neotys
  url: https://neotys.com
academy:
- https://academy.neotys.com/courses/foradvancedusers/lessons/selenium-integration/
documentation:
- https://www.neotys.com/documents/doc/neoload/latest/8266.htm
repo:
- https://github.com/Neotys-Labs/Selenium-WebDriver-Java
- https://github.com/Neotys-Connect/neotys-selenium-server
toc: |
  - [Supported approach to integrating Selenium with NeoLoad](#supported-approach-to-integrating-selenium-with-neoload)
    * [Note on using Eclipse to compile your test suite](#note-on-using-eclipse-to-compile-your-test-suite)
  - [Experimental Selenium Server for WebDriver in any language](#experimental-selenium-server-for-webdriver-in-any-language)
    * [Results in NeoLoad from the Experimental Server-based approach](#results-in-neoload-from-the-experimental-server-based-approach)
---

You can reuse Selenium tests in NeoLoad for two purposes:

1. Automatically run through a functional workflow and capture the resulting HTTP traffic as a NeoLoad user path.
2. Sample real browser metrics using the functional workflow during a load test

# Supported approach to integrating Selenium with NeoLoad

For Java and C# based Selenium scripts, our [official documentation](https://www.neotys.com/documents/doc/neoload/latest/8266.htm)
 covers a model where you include
 our custom JARs or assemblies into your Selenium test project, layer them in to your test scripts,
 and then compile those scripts into an executable for use in NeoLoad.

![Client Based Execution](/_pages/tutorials/selenium-and-neoload/images/client-based-execution.png "Client Based Execution")

An alternative, scalable model to the approach above is described below.

## Note on using Eclipse to compile your test suite

If when you go to compile your project as an executable JAR and you do not see any 'Launch configuration'
 entries, it is likely that you did not run and verify your Selenium test. Additionally, only Java Applications launch configurations are shown in the Runnable Jar dialog, which have a prerequisite of defining a 'public static void main'
 method as a JAR entrypoint target.

 To do so, [read this thread](https://stackoverflow.com/questions/3224364/launch-configuration-shows-up-blank-when-trying-to-export-runnable-jar/3224505) and [this other thread](https://stackoverflow.com/a/54177759).

# Experimental Selenium Server for WebDriver in any language

Though the above approach is supported, there are a number of disadvantages:

* Only supports Java and C# scripts
* Requires additional code in existing scripts
* Requires re-compilation of function test suite

In 2020 in collaboration with a number of Neotys customers, an alternative approach to centralize
 the "magic sauce" of the integration away from individual scripts and into a Selenium Server variant
 was successfully PoC'd and is in use by these customers already.

![Server Based Execution](/_pages/tutorials/selenium-and-neoload/images/server-based-execution.png "Server Based Execution")

[You can read more about this alternative approach here.](https://github.com/Neotys-Connect/neotys-selenium-server)

If you are using NodeJS or other languages and have scripts that either already use RemoteWebDriver
 this approach may suit you better, and we're always looking for collaborators on this project!

## Results in NeoLoad from the Experimental Server-based approach

![Server Based Results](/_pages/tutorials/selenium-and-neoload/images/server-based-results.png "Server Based Results")


Please see the links on the side of this article for more information.
