---
layout: article
title: Other Neotys Sites
permalink: /other-neotys-sites
comments: false
sites:
- name: neotys.com
  url: https://www.neotys.com
- name: Neotys Academy
  url: https://academy.neotys.com
- name: Support Center
  url: https://www.neotys.com/support
- name: Submit a Product Idea
  url: https://ideas-neotys.ideas.dimelo.com/
- name: Questions and Answers
  url: https://faq-neotys.answers.dimelo.com/
---

<div class="boxed-outer">

  {% for link in page.sites %}
  <div class="boxed-category other-sites-box">
    <div class="other-sites-box-inner">
    <a href="{{ link.url }}" use-same-tab="true">{{ link.name }}</a>
    </div>
  </div>
  {% endfor %}

</div>

<style type="text/css">
.other-sites-box {
  min-width: 9em;
  margin:1%;
  min-height: 7em;
  border-radius: 10%;
  padding: 0em;
  background: #eee;
  text-align: center;
  font-size:1.5em;
  position: relative;
  text-align: center;
}
.other-sites-box-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);  
  transform: translate(-50%, -50%);   
}
</style>
