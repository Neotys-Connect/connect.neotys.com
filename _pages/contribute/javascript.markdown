---
layout: article
title: Creating a Javascript Library
permalink: /contribute/javascript
documentation:
- https://www.neotys.com/documents/doc/neoload/latest/993.htm
toc: |
  - [What is a NeoLoad Javascript Library?](#what-is-a-neoload-javascript-library)
  - [Getting Started](#getting-started)
  - [Technical Prerequisites](#technical-prerequisites)
  - [How to Access Your Project's Javascript Libraries](#how-to-access-your-projects-javascript-libraries)
  - [How the NeoLoad Engine Uses Your Javascript Libraries](#how-the-neoload-engine-uses-your-javascript-libraries)
  - [Testing Your Javascript Library](#testing-your-javascript-library)
  - [Once You're Ready to Publish](#once-youre-ready-to-publish)
    * [Non-DIY Method (send us your project)](#non-diy-method-send-us-your-project)
  - [Examples](#examples)
---

# What is a NeoLoad Javascript Library?

A Javascript Library is simply a global javascript block that can defined shared
 functions and variables for use in various places in NeoLoad user path scripts.

Some examples of places where you can use Javascript library shared functions are:

- Custom Javascript action blocks
- Javascript data variables
- fields where ${...} expansion notation can be used, such as:
  - HTTP Request URL Path
  - HTTP Headers
  - Request body (HTTP and other types)
  - Other custom action property values
  - Server hostname

You can have more than one Javascript library, for instance one for value encoding/decoding
 specific to your application under test and another for general cryptographic functions.

# Getting Started

{% include pages/project_getting_started.html type="Javascript library" more="https://www.neotys.com/documents/doc/neoload/latest/993.htm" %}

# Technical Prerequisites

To write custom Javascript libraries, you need:

- NeoLoad Desktop Designer (GUI) installed
- A NeoLoad project loaded up
- Experience with writing Javascript/ECMAscript

# How to Access Your Project's Javascript Libraries

In NeoLoad, click the top menu 'Edit' and 'JS Libraries' menu item. This displays
 the list of libraries in your project. By default there usually is a 'NeoLoad
 Default Library' which you may or may not chose to keep, but it's good for reference.

To create a new library, click the yellow script-looking icon at the bottom of this list.
 The name you give it does not have to include a .js at the end, as NeoLoad will
 simply create a [your name].js file in the scripts subdirectory. If you chose an existing
 script (maybe from another project), it will COPY that .js file into your current project.

# How the NeoLoad Engine Uses Your Javascript Libraries

You do not need to 'import' your libraries anywhere in NeoLoad as all contexts
 where functions may be called already have loaded all libraries globally.

If you have external JAVA Jar libraries that you want to call from Javascript,
 you can do so by copying the external .jar file(s) in the project 'extlib' subfolder
 and referencing classes and objects using the full classpath name.
 [See this documentation for more detail on Javascript <-- --> Java marshaling.](https://www.neotys.com/documents/doc/neoload/latest/1629.htm)

***NOTE: NeoLoad is not a NodeJS engine*** so if you're simply copying and pasting
 NodeJS examples, it will almost certainly not work. NeoLoad implements JSR-305
 so if you feel the need to run some other interpreter, you will have to do so
 by writing those scripts (stored under custom-resources) outside NeoLoad, then
 running an external process (such as Node, installed where you intend to run
 the User Path) and executing those scripts externally.

# Testing Your Javascript Library

Typically, you would exercise your shared functions by using it in the context
 of a user path, action, etc. Good practice is to also write "unit test functions"
 along with your library where there is a single 'super test' function that calls all
 of these unit test functions. Then you can have a 'JS Unit Tests' user path that
 is only for local/design-time and sanity checks.

To test your functions in the context of actual User Paths you use as part of load tests,
 you would want to verify this using the Check User Path feature in NeoLoad then
 carefully scrutinize the logs and outcomes of your custom functions as used by
 various parts of your workflow.

# Once You're Ready to Publish

{% include pages/project_ready_to_publish.html %}

## Non-DIY Method (send us your project)

{% include pages/project_send_us.html %}

# Examples

For projects created after version 7.1, unless otherwise deleted, you should see
 a 'NeoLoad Default Library' which lives under your project as 'scripts/neoload-1.0.js'.

Out of the box examples are provided in every [new] NeoLoad project and include:

- __urlDecode
- __escapeHTML
- __unescapeHTML
- __randomString
- __getVirtualUserID
- __getUserPathName
- __UUID
- __digest
- __toHexString
- __toUTF8Array
- (and others...)
