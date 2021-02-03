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
        {% for article in sorted_tutorials limit:6 %}
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
  <div class="home-column">
    <div class="home-column-inner">
      <a href="/integrations-and-frameworks">
      <div class="home-icon home-icon-assets">
      </div>
      <div class="home-column-title">
      <span>Integrations & Frameworks</span>
      </div>
      </a>
      <div class="home-column-list">
        <div>
          <div class="home-column-list-two-lists">
          Integrations:
          <ul>
          {% assign sorted_integrations = site.data.integrations.items | sort: "priority" | reverse %}
          {% for article in sorted_integrations limit:5 %}
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
          {% for article in sorted_frameworks limit:5 %}
            <li>
              {% include article_link.html article=article %}
            </li>
          {% endfor %}
          </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="home-column-more">
      <a href="/integrations-and-frameworks">more</a>
    </div>
  </div>
  <div class="home-column">
    <div class="home-column-inner">
      <!-- a href="/contribute" -->
      <div class="home-icon home-icon-contribute">
      </div>
      <div class="home-column-title">
      <span>Create & Contribute</span>
      </div>
      <!-- /a -->
      <div class="home-coming-soon">
      &nbsp;
      </div>
    </div>
  </div>
  <div class="home-column last">
    <div class="home-column-inner">
      <!-- a href="/get-involved" -->
      <div class="home-icon home-icon-involved">
      </div>
      <div class="home-column-title">
      <span>Get Involved</span>
      </div>
      <!-- /a -->
      <div class="home-coming-soon">
      &nbsp;
      </div>
    </div>
  </div>
</div>
