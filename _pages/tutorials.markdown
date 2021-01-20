---
layout: page
title: Tutorials
permalink: /tutorials/
---

{% assign groups = site.data.tutorials.items | group_by:"category" %}
{% for group in groups %}
  <div>
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
