---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
permalink: /
---

<div class="home-table">
  <div class="home-column">
    <div class="home-column-inner">
      <a href="/tutorials">
      <div class="home-icon home-icon-tutorials">
      </div>
      <div class="home-column-title">
      <span>Tutorials</span>
      </div>
      </a>
      <div class="home-column-list">
        Top searches:
        <ul>
        {% assign sorted_tutorials = site.data.tutorials.items | sort: "priority" | reverse %}
        {% for article in sorted_tutorials limit:8 %}
          <li>
            {% include article_link.html article=article %}
          </li>
        {% endfor %}
        </ul>
      </div>
    </div>
    <div class="home-column-more">
      <a href="/tutorials">more</a>
    </div>
  </div>
  <div class="home-column home-column-integrations-and-frameworks">
    <div class="home-column-inner">
      <a href="/integrations-and-frameworks">
      <div class="home-icon home-icon-assets">
      </div>
      <div class="home-column-title">
      <span>Integrations & Frameworks</span>
      </div>
      </a>
      <div class="home-column-list">
          <div class="home-column-list-two-lists">
          Integrations:
          <ul>
          {% assign sorted_integrations = site.data.integrations.items | sort: "priority" | reverse %}
          {% for article in sorted_integrations limit:7 %}
            <li>
              {% include article_link.html article=article %}
            </li>
          {% endfor %}
          </ul>
          </div>
          <div class="home-column-list-two-lists">
          Frameworks:
          <ul>
          {% assign sorted_frameworks = site.data.frameworks.items | sort: "priority" | reverse %}
          {% for article in sorted_frameworks limit:7 %}
            <li>
              {% include article_link.html article=article %}
            </li>
          {% endfor %}
          </ul>
          </div>
      </div>
    </div>
    <div class="home-column-more">
      <a href="/integrations-and-frameworks">more</a>
    </div>
  </div>
  <div class="home-column">
    <div class="home-column-inner" id="home-column-inner-contribute">
      <a href="/contribute">
      <div class="home-icon home-icon-contribute">
      </div>
      <div class="home-column-title">
      <span>Create & Contribute</span>
      </div>
      </a>
      <div class="home-buttons">
      <a href="/contribute/start"><div class="home-contribute-button">Start a Project</div></a>
      <a href="/contribute/publish"><div class="home-contribute-button">Publish a Project</div></a>
      </div>
      <div class="home-column-list" id="top-projects" style="display:none;">
        Recent Projects:
        <ul id="top-projects-list">
        <li class="top-projects-item"><a href="https://github.com/Neotys-Connect">click here for more</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="home-column last">
    <div class="home-column-inner">
      <a href="/get-involved">
      <div class="home-icon home-icon-involved">
      </div>
      <div class="home-column-title">
      <span>Get Involved</span>
      </div>
      <div class="home-get-involved-details">
      For regular contributors or those looking to regularly contribute:<br />
      <br />
      Next Meeting: <br />
      {{ site.data.roundtable.next_meeting.date }} <br /> {{ site.data.roundtable.meeting_reoccurrence.time }}
      <br /><br />
      (agenda and contact)
      </div>
      </a>

    </div>
  </div>
</div>

<div class="home-bande">
  <div class="home-bande-image" style="background-image:url(https://miro.medium.com/max/4118/1*EuT_9qPbsVpJ_mT51BLXzQ.jpeg)">
  </div>
  <div class="home-bande-text">
  <a href="https://bit.ly/perf21-survey" show-external-link="false">
    <h3>Performance Practices Survey</h3>
    <div markdown="1">
We are currently running a research project to understand granularly
 how organizations manage and improve their performance practices.

Take the survey and help us out!
</div>
    </a>
  </div>
</div>

<div class="home-bande">
  <div class="home-bande-text">
  <a href="/tutorials/neoload-as-code" show-external-link="false">
    <h3>NeoLoad as-code Workshop</h3>
    <div markdown="1">
NeoLoad as-code is a Domain-specific Language (DSL) for YAML and JSON to describe load testing scripts (NeoLoad User Paths), variables, and other test execution settings.

We have a 3hr workshop recording on it here!
</div>
    </a>
  </div>
  <div class="home-bande-image" style="background-image:url(https://png.pngtree.com/png-vector/20190406/ourlarge/pngtree-yaml-file-document-icon-png-image_917597.jpg)">
  </div>
</div>

<div class="home-bande">
  <div class="home-bande-image" style="background-image:url(https://www.alliance-conference.com/media/rsvjnrbv.jpg)">
  </div>
  <div class="home-bande-text">
  <a href="https://www.neotys.com/neoload-jenkins-workshop-series" show-external-link="false">
    <h3>NeoLoad in Jenkins/CI Workshop Series</h3>
    <div markdown="1">
Looking to integrate load and performance testing into CI pipelines? Neotys works
 with customers all the time to right-fit these feedback loops into DevOps and Continuous
 Delivery paradigms.

Click here to view the on-demand workshop series!
</div>
    </a>
  </div>
</div>

{% include connect-repos-js.html %}
<script>
var intIndexLoad = setInterval(function() {
  if(typeof $ != 'undefined' && loadReposList) {
    clearTimeout(intIndexLoad);
    $("#top-projects").hide()
    $('<div class="home-column-more"><a href="/projects">more</a></div>').insertAfter("#home-column-inner-contribute")
    loadReposList({
      target:"#top-projects-list",
      filter: repo => repo.owner.login == "Neotys-Connect",
      max: 6,
      after: (repos) => {
        $("#top-projects").show()
      }
    });
  }
},100)
</script>
