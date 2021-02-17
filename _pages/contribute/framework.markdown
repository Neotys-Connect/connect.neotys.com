---
layout: article
title: Creating Frameworks for Correlation Rules
permalink: /contribute/framework
toc: |
  - [What are NeoLoad Frameworks?](#what-are-neoload-frameworks)
  - [Why are frameworks helpful?](#why-are-frameworks-helpful)
  - [How NeoLoad frameworks work](#how-neoload-frameworks-work)
  - [A Warning about non-unique tokens](#a-warning-about-non-unique-tokens)
  - [Testing your frameworks](#testing-your-frameworks)
  - [Once You're Ready to Publish](#once-youre-ready-to-publish)
  - [Examples](#examples)
examples:
- title: Salesforce (Lightning)
  url: https://github.com/Neotys-Connect/neoload-frameworks/tree/main/salesforce
- title: ASP.NET
  url: https://github.com/Neotys-Connect/neoload-frameworks/tree/main/aspnet
- title: SAP
  url: https://github.com/Neotys-Connect/neoload-frameworks/tree/main/sap
- title: 'SSO: SAML'
  url: https://github.com/Neotys-Connect/neoload-frameworks/tree/main/saml
- title: CSRF
  url: https://github.com/Neotys-Connect/neoload-frameworks/tree/main/csrf
- title: Oracle Forms
  url: https://github.com/Neotys-Connect/neoload-frameworks/tree/main/oracleforms
---

# What are NeoLoad Frameworks?
NeoLoad 'frameworks' are sets of rules to correlate data tokens in recorded traffic.
 The raw traffic from your application may use many generic technologies (e.g. CSRF tokens, SAML, OAuth)
 while also having app-specific tokens for form values, hidden values, and other data
 that is required to reproduce the traffic in a load test correctly.

# Why are frameworks helpful?
Frameworks help you collect and run these rules instead of having to search and replace individual
 data tokens every time you record a new workflow (NeoLoad User Path), significantly
 reducing the time it takes to script and get your user path working correctly.

Each rule in a framework has an 'extract' and 'replace' side. The extraction side is the part of the rule
 that helps the NeoLoad correlation engine understand what pattern to use to look for data tokens.
 Similarly the replacement side helps NeoLoad understand where to look in raw request definitions
 for the specific values found by the extraction and how to properly replace static values
 with their dynamic counterparts.

# How NeoLoad frameworks work

At the time one or more framework rules are run (typically after the user path is recorded),
 the NeoLoad correlation engine will use the extractor rules to make an internal list of
 all values found with those rules, then for each of those values search for it's
 match based on the replacement part of the rules. If a value found by extraction from responses
 is not found in subsequent requests, the rule does not create an extractor.

For situations where there are multiple values found by extraction rules that are used across
 requests at the same time, you will see variable extractors created with the same name
 as your rule, however there will be a numeric value appended to them. This ensures
 that unique values are preserved during playback that do not conflict with each other.

# A Warning about non-unique tokens

Rules can be written that may extract values which are not very unique at all such as
 small numbers or character sequences which also show up in many other request and that
 are unrelated to the actual intent of the rule.

# Testing your frameworks

Before expecting that frameworks magically work as you expect, you should test them thoroughly.

This usually means making a duplicate of one of your user paths as the intended target of
 applying the framework and then running the framework by right-clicking on the user path and
 selecting the 'Search for dynamic parameters' and unchecking the 'generic dynamic parameters'
 option, leaving just the pre-defined framework(s) to use. It should show you that there are
 one or more matches.

Once the wizard is finished, you should actually Check the User Path
 and verify that there are no unanticipated errors. If there are and they are related to
 newly introduced variable extractors from your framework, you will want to review what
 data it extracted and injected, then revise your framework rule accordingly.

# Once You're Ready to Publish

Please see the [Neotys Connect guide on contributing a framework here](https://connect.neotys.com/contribute/framework)
 for more instructions.

# Examples

For a complete list of examples, please see our ['Integrations and Frameworks' page](/integrations-and-frameworks#frameworks).

{% include pages/examples_block.html %}
