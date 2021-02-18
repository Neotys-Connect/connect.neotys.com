---
layout: article
title: Get Involved
permalink: /get-involved/
toc: |
  - [How to Get Involved](#how-to-get-involved)
  - [Next Meeting & Agenda](#next-meeting-_-agenda)
comments: false
---

# How to Get Involved

A group including our {% include core-team-link.md %}, partners and customers, meet monthly to discuss
 upcoming contributions, areas of improvement, and how to get more people involved.

We meet over Zoom every {{ site.data.roundtable.meeting_reoccurrence.pattern }} from {{ site.data.roundtable.meeting_reoccurrence.time }}.
 Anyone who is interested in contributing is welcomed to join.

# Next Meeting & Agenda

Please contact the {% include core-team-link.md %} to receive an invite to our next meeting which is:
 ***{{ site.data.roundtable.next_meeting.date }} at {{ site.data.roundtable.meeting_reoccurrence.time }}***

{{ site.data.roundtable.next_meeting.agenda | markdownify }}

# Who's Involved

<div class="boxed-outer">
{% assign sorted_community = site.data.roundtable.members | sort: "name" %}
{% for member in sorted_community %}
  <div class="boxed-category" style="text-align:center;">
  {% assign general_link="#" %}
  {% if member.twitter %}{% assign general_link=member.twitter %}{% endif %}
  {% if member.github %}{% assign general_link=member.github %}{% endif %}
  {% if member.website %}{% assign general_link=member.website %}{% endif %}
  <a href="{{ general_link }}">
  <img class="community-person-thumbnail" src="{{ member.image }}" /><br />
  {{ member.name }}
  </a>
  <div>
  {% if member.github %}<svg class="svg-icon grey" title="{{ member.name }} on Github" onclick="window.open('{{ member.github }}')" style="cursor:pointer;"><use xlink:href="{{ '/assets/minima-social-icons.svg#github' | relative_url }}"></use></svg>{% endif %}
  {% if member.twitter %}<svg class="svg-icon grey" title="{{ member.name }} on Twitter" onclick="window.open('{{ member.twitter }}')" style="cursor:pointer;"><use xlink:href="{{ '/assets/minima-social-icons.svg#twitter' | relative_url }}"></use></svg>{% endif %}
  {% if member.linkedin %}<svg class="svg-icon grey" title="{{ member.name }} on LinkedIn" onclick="window.open('{{ member.linkedin }}')" style="cursor:pointer;"><use xlink:href="{{ '/assets/minima-social-icons.svg#linkedin' | relative_url }}"></use></svg>{% endif %}
  </div>
  </div>
{% endfor %}
</div>
