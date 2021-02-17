---
layout: article
title: Creating a REST API Integration
permalink: /contribute/restapi
documentation:
- title: Product Docs
  url: https://www.neotys.com/documents/doc/nlweb/latest/en/html/25057.htm
- title: NeoLoad Web REST APIs
  url: https://neoload-rest.saas.neotys.com/explore/
examples:
- title: NeoLoad CLI
  url: https://github.com/Neotys-Labs/neoload-cli
---

# What Is a NeoLoad REST API Integration

At the heart of the NeoLoad Web Platform are the [NeoLoad Web REST APIs](https://neoload-rest.saas.neotys.com/explore/). These set of endpoints provide programmatic access to various functions of the testing
 platform, such as:

- Workspace Management
- Runtime (managing and running tests)
- Results (exporting data and updating certain data points)
- Resources (zones, reservations, etc.)
- User Administration

# Why Create a REST API Integration?

Because these are standardized, documented HTTP/REST API calls, you can create a
 whole host of unique integrations and usage scenarios, often of which are things
 like:

- Automated setup of workspaces per team/group in your organization
- Reflecting project metadata for use in external systems' pick-lists and selection UIs
- Update test settings metadata with hashtag labels and other complimentary info
- Aggregate over test data for specific custom exports to other systems
- Create HTML dashboards unique to your analysis models based on test result data
- Check for and report on zone usage (queue until resources to become available)
- Remove users that are deactivated in an external authentication system

# Examples

As we work with partners and customers to contribute their own examples, you will
 find that this list will grow quickly!

{% include pages/examples_block.html %}
