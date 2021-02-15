---
layout: article
title: Creating a Custom Action
permalink: /contribute/custom-action
documentation:
- https://www.neotys.com/documents/doc/neoload/latest/11841.htm
examples:
- title: Kafka
  url: https://github.com/Neotys-Labs/kafka
- title: Terminal Emulation
  url: https://github.com/Neotys-Connect/Terminal
- title: TCP Generator
  url: https://github.com/Neotys-Connect/TcpGenerator
- title: Whiteblock Blockchain
  url: https://github.com/Neotys-Connect/WhiteblockBlockChain
- title: ISO 8583
  url: https://github.com/Neotys-Connect/Iso8583
- title: Database Advanced Actions
  url: https://github.com/Neotys-Labs/Database-Advanced-Actions
- title: Worksoft Certify
  url: https://github.com/Neotys-Labs/Worksoft-Certify
- title: Ranorex
  url: https://github.com/Neotys-Labs/Ranorex
---

# What is a 'Custom Action'?

Custom Actions extend NeoLoad to support things that you want to happen when run
 a user path (the primary workload or workflow definition to NeoLoad tests).

Typically, a custom action defines one or more logical blocks that can be placed
 in user paths such as sending custom traffic or otherwise executing custom actions
 as part of a broader workflow. Examples include [running database queries](https://github.com/Neotys-Labs/Database-Advanced-Actions), preparing and streaming real-time test status to other systems (such as
  in many APM integrations with NeoLoad), or kicking off separate processes driven
  by external tools (such as with [Worksoft Certify](https://github.com/Neotys-Labs/Worksoft-Certify)
  and [Ranorex](https://github.com/Neotys-Labs/Ranorex) integrations).

# Getting Started

{% include pages/project_getting_started.html type="custom action" more="https://www.neotys.com/documents/doc/neoload/latest/11841.htm" %}

# Technical Prerequisites

{% include pages/project_java_prerequisites.html %}

# Testing Your Custom Action

{% include pages/project_testing_basics.html %}

# Once You're Ready to Publish

{% include pages/project_ready_to_publish.html %}

## Non-DIY Method (send us your project)

{% include pages/project_send_us.html %}

# Examples

{% include pages/examples_block.html %}
