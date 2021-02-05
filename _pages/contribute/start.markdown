---
layout: page
title: Start a Project
permalink: /contribute/start
---

# Prerequisites

Different project types have different prerequisites and may require different level of skills.

In almost all cases, it helps to be well familiarized with how to use NeoLoad (:

# Project Types

<div class="boxed-outer">

{% for item in site.data.project_types.items %}
  <div class="boxed-category contribution-type-box" markdown="1">
### [{{ item. key }}]({{ item.details_url }})
<div style="min-height:75px;">
<a href="{{ item.details_url }}">{{ item.description | markdownify }}</a>
</div>

**Skill Level:** {{ item.skill }}

  [→ LEARN MORE]({{ item.details_url }})
  </div>
{% endfor %}

</div>
<p></p>
# Are we missing something?

If you don't see a project type that meets what you want to do, let's discuss it together.
