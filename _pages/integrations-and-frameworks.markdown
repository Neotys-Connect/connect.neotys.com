---
layout: page
title: Integrations & Frameworks
show_title: false
permalink: /integrations-and-frameworks/
---
<div>
<div style="float:left;width:50%;padding-top:0px;">

<h2>Integrations</h2>
{% assign groups = site.data.integrations.items | group_by:"category" %}
{% for group in groups %}
  <div>
    <h3>{{ group.name }}</h3>
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
<div style="float:left;width:50%;">

<h2>Frameworks</h2>
<ul>
{% for article in site.data.frameworks.items %}
  <li>
    {% include article_link.html article=article %}
  </li>
{% endfor %}
</ul>

</div>
</div>
