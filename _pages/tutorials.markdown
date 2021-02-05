---
layout: page
title: Tutorials
permalink: /tutorials/
---

<div class="boxed-outer">

{% assign groups = site.data.tutorials.items | where_exp:"item", "item.visibility != 'home-only'" | sort: "category" | group_by:"category" %}
{% for group in groups %}
  <div class="boxed-category">
    <h2>{{ group.name }}</h2>
    <ul>
    {% for article in group.items %}
      <li>
        {% include article_link.html article=article %}
      </li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}

</div>
