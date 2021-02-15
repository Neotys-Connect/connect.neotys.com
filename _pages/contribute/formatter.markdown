---
layout: article
title: Creating a Formatter (encode/decode)
permalink: /contribute/formatter
documentation:
- https://www.neotys.com/documents/doc/neoload/latest/11854.htm
examples:
- title: Vaadin
  url: https://github.com/Neotys-Labs/Vaadin
- title: Adobe HDS
  url: https://www.neotys.com/hds
---

# What is a 'Formatter'?

Formatters (encode/decode) extend NeoLoad to be able to pre-process the outbound
 and inbound traffic in your test.

Using the [Data Format Extension API](https://www.neotys.com/documents/doc/neoload/latest/11854.htm)
 your custom encode/decode logic will transform the inbound responses to readable
 structures (typically JSON or XML) in the NeoLoad request editor.

Conversely, outbound requests defined with details (such as data, tokens, etc) in these readable
 structures will be encoded into the appropriate binary or otherwise format.

# Getting Started

{% include pages/project_getting_started.html type="formatter" more="https://www.neotys.com/documents/doc/neoload/latest/11854.htm" %}

# Technical Prerequisites

{% include pages/project_java_prerequisites.html %}

# Testing Your Formatter

{% include pages/project_testing_basics.html %}

# Once You're Ready to Publish

{% include pages/project_ready_to_publish.html %}

## Non-DIY Method (send us your project)

{% include pages/project_send_us.html %}

# Examples

{% include pages/examples_block.html %}
