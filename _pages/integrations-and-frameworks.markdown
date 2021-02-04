---
layout: page
title: Integrations & Frameworks
show_title: false
permalink: /integrations-and-frameworks/
---
<div class="boxed-outer">
<h2 style="width:100%;">Integrations</h2>
{% assign groups = site.data.integrations.items | group_by:"category" | sort: "category" %}
{% for group in groups %}
  <div class="boxed-category" style="margin-left:2em;">
    <h3>{{ group.name }}</h3>
    <ul>
    {% assign articles = group.items | sort: "title" %}
    {% for article in articles %}
      <li>
        {% include article_link.html article=article %}
      </li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}

</div>
<p>&nbsp;</p>
<div class="boxed-outer">

<h2 style="width:100%;">Frameworks</h2>
<ul>
{% for article in site.data.frameworks.items %}
  <li>
    {% include article_link.html article=article %}
  </li>
{% endfor %}
</ul>

</div>
