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

<div class="boxed-category">
<h2 style="width:100%;">Frameworks</h2>
NeoLoad 'frameworks' are sets of rules to correlate data tokens in recorded traffic.
 Frameworks help you collect and run these rules instead of having to search and replace individual
 data tokens every time you record a new workflow (NeoLoad User Path), significantly
 reducing the time it takes to script and get your user path working correctly.

<p></p>
<div markdown="1">
[For more information about frameworks shared on this site, see the 'neoload-frameworks' README.](https://github.com/Neotys-Connect/neoload-frameworks).
</div>

</div>
<div class="boxed-category" style="padding-top:2em;">
<div markdown="1">
***NOTE:*** there are many other apps and technologies supported by NeoLoad out-of-the box.
</div>
<p></p>
<ul>
{% for article in site.data.frameworks.items %}
  <li>
    {% include article_link.html article=article %}
  </li>
{% endfor %}
</ul>
</div>

</div>
