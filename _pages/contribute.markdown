---
layout: page
title: Create & Contribute
permalink: /contribute/
---

<div class="boxed-outer">

  <div class="boxed-category" markdown="1">

# Start a New Project

What type of project are you interested in?

Probably good to first check if something like your idea doesn't already exist.
 Otherwise, pick a project type below.

<div class="boxed-outer">

{% for item in site.data.project_types.items %}
<div class="boxed-category contribution-type-box" markdown="1">
#### [{{ item. key }}]({{ item.details_url }})
</div>
{% endfor %}

</div>

  </div>

  <div class="boxed-category" markdown="1">

# Contribute an Existing Project

Got something already?

- [Read our project publishing tutorial](/contribute/publish)
- Review our [Terms of Service](/terms-of-service) and [Code of Conduct](/code-of-conduct)
- [Got questions? Contact our ](/contact){%- include core-team-link.md -%}

<p></p>

Examples from the community:

<ul>
{% assign sorted_projects = site.data.projects.items | sort: "priority" | reverse %}
{% for article in sorted_projects limit:10 %}
  <li>
    {% include article_link.html article=article %}
  </li>
{% endfor %}
</ul>

</div>

</div>
