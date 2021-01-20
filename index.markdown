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
        <ul>
        {% for article in site.data.tutorials.items limit:5 %}
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
          <div style="float:left;width:49%;">
          Integrations:
          <ul>
          {% for article in site.data.integrations.items limit:5 %}
            <li>
              {% include article_link.html article=article %}
            </li>
          {% endfor %}
          </ul>
          </div>
          <div style="float:left;width:49%;">
          Frameworks:
          <ul>
          {% for article in site.data.frameworks.items limit:5 %}
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
      <a href="/contribute">
      <div class="home-icon home-icon-contribute">
      </div>
      <div class="home-column-title">
      <span>Create & Contribute</span>
      </div>
      </a>
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
      </a>
    </div>
  </div>
</div>
