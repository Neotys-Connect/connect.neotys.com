---
layout: article
title: Projects
permalink: /projects/
---

<div class="boxed-outer">

  <div class="boxed-category" markdown="1" style="padding-right:10%;">

# Neotys-Connect (Community-driven)

These are repos maintained by Connect community contributors. To learn more about
 their scope and supportability, read up about [Publishing a Project](/contribute/publish).

<ul id="Neotys-Connect-list">
</ul>

  </div>

  <div class="boxed-category" markdown="1" style="width:40%;">

# Neotys-Labs (Neotys Projects)

These are repos maintained by Neotys dev teams. To learn how this is
 different than the Connect community, [read up in our About section here](/about).

<ul id="Neotys-Labs-list">
</ul>

  </div>

</div>

<script async src="/assets/connect-repos.js"></script>
<script>
var intReposLoaded = setInterval(function() {
  if(typeof $ != 'undefined') {
    clearTimeout(intReposLoaded);

    loadReposList({
      target:"#Neotys-Connect-list",
      filter: repo => repo.owner.login == "Neotys-Connect",
      max: 100
    });

    loadReposList({
      target:"#Neotys-Labs-list",
      filter: repo => repo.owner.login == "Neotys-Labs",
      max: 20,
      after: () => {
        $('<div class="home-column-more" style="text-align:center;"><a href="https://github.com/Neotys-Labs">more</a></div>').insertAfter("#Neotys-Labs-list")
      }
    });
  }
},100)
</script>
