---
layout: article
title: NeoLoad as-code
category: DevOps
permalink: /tutorials/neoload-as-code
support: Community
videos:
  - https://www.youtube.com/embed/YDCvymJUZrk
contributors:
  - text: Paul Bruce
    url: https://github.com/paulsbruce
repo:
  - https://github.com/Neotys-Connect/neoload-as-code
slides:
  - type: google
    docid: 19ldKFuET6ost-dkq_aPiIw0SIOf8ltFcKAUYS1iAVMk
    pubid: 2PACX-1vTpbTLEN0CJzT-FOrRvb-Ygk3OnwvvK3OWux55mpTWjKygDhGnpR4T25fQljiorHMv5dh5qyLeQf03E
toc: |
  - [Why NeoLoad as-code](#why-neoload-as-code)
  - [Examples](#examples)
  - [Training / Workshops](#training--workshops)
  - [Getting Started](#getting-started)
  - [DSL Schema Support](#dsl-schema-support)
    * [VS Code Configuration](#vs-code-configuration)
    * [IntelliJ Configuration](#intellij-configuration)
  - [Additional CI and CLI workshops](#additional-ci-and-cli-workshops)
---

NeoLoad as-code is a Domain-specific Language (DSL) for YAML and JSON to describe
 load testing scripts (NeoLoad User Paths), variables, and other test execution settings.

These as-code files can be:

* checked in to source code, just like any other automation artifacts
* refactored / reused so that SCM changes are versionable/testable/traceable
* run in tandem with classic NeoLoad Desktop Designer (.nlp) projects
* dynamically written during pipeline execution

# Why NeoLoad as-code

Some people just like to work in code. Many developers and automation engineers
 live in their IDE or editor of choice and why should load testing be any different?

Much of the early surface area for modern development is around APIs, and therefore
 API testing is a huge part of modern software delivery cycles and validating
 their performance shouldn't be hard.

Using NeoLoad as-code and the NeoLoad CLI
 connects this type of early work into the rest of the performance and load testing
 capabilities that the NeoLoad Platform has to offer. Starting with NeoLoad as-code for API testing also:

- encourages earlier discussions about SLAs, environments, and test data
- eases transition of test assets from early dev/test checks to downstream activities
- fits in perfectly with highly automated processes such as CI pipelines
- provides traceability and proof of performance requirements fulfillment
- enables templating and standardization of process for performance testing

# Examples

There are a ton of [examples from our training workshops in the 'neoload-as-code' repo](https://github.com/Neotys-Connect/neoload-as-code), but below is the general gist of how writing as-code YAML DSL flows.

![Write and edit load tests confidently](/_pages/tutorials/neoload-as-code/images/as-code-typing.gif)

![Example as-code YAML DSL from training module 1](/_pages/tutorials/neoload-as-code/images/example-module1.png)


# Training / Workshops

The video and deck used for our public training workshop on 2021-03-04 are below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/YDCvymJUZrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTpbTLEN0CJzT-FOrRvb-Ygk3OnwvvK3OWux55mpTWjKygDhGnpR4T25fQljiorHMv5dh5qyLeQf03E/embed?start=true&loop=true&delayms=10000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

# Getting Started

To write NeoLoad as-code YAML DSL, you will need:

1. A modern IDE or text editor of your choice

   NOTE: Preferably something that supports JSON Schema for YAML such as:
   - [VS Code](https://code.visualstudio.com/download) (also see schema support below)
   - [IntelliJ Community Edition](https://www.jetbrains.com/idea/download/) (also see schema support below)
   .

2. The NeoLoad CLI

   TO INSTALL follow these steps which require:
   - [Python 3.6 or higher](https://www.python.org/downloads/)
   - Access to [Pypi.org](https://pypi.org/project/neoload/)
   - in a command/terminal window, type 'pip3 install neoload'

# DSL Schema Support

To have YAML and as-code DSL specific text validation as well as autocomplete
 features, you will need to have the YAML extension installed and configure.

JSON Schema to use: [https://raw.githubusercontent.com/Neotys-Labs/neoload-models/v3/neoload-project/src/main/resources/as-code.latest.schema.json](https://raw.githubusercontent.com/Neotys-Labs/neoload-models/v3/neoload-project/src/main/resources/as-code.latest.schema.json)

File patterns to use:
- **/*.nl.yaml
- **/default.yaml

You may also want to run NeoLoad CLI to validate your file as well when you save.

- An example of this in VS Code is to install the ['Run on Save'](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) extension and configure it in your settings.json file.

## VS Code Configuration

File -> Preferences -> Settings -> Extensions -> Scroll down and find "Edit in settings.json"

Or in these paths in your OS:

- Windows %APPDATA%\Code\User\settings.json
- macOS $HOME/Library/Application Support/Code/User/settings.json
- Linux $HOME/.config/Code/User/settings.json

[A reference example settings.json file can be found here.](https://raw.githubusercontent.com/Neotys-Connect/neoload-as-code/master/training/resources/vscode.settings.json)

![VS Code JSON Schema Configuration for as-code](/_pages/tutorials/neoload-as-code/images/vscode-schema-settings.png)

## IntelliJ Configuration

Preferences > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings

![IntelliJ JSON Schema Configuration for as-code](/_pages/tutorials/neoload-as-code/images/intellij-schema-settings.png)

# Additional CI and CLI workshops

- [NeoLoad in Jenkins and CI 101](https://www.youtube.com/watch?v=mqPIaYeRSmQ)
- [NeoLoad in Jenkins and CI 201](https://www.youtube.com/watch?v=ixTk9Vu9NKw)
- [NeoLoad in Jenkins and CI 301](https://www.youtube.com/watch?v=13QFi5Rzi6s)
