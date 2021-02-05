---
layout: article
title: Publishing a Project
permalink: /contribute/publish
examples:
- title: NeoLoad Compose
  url: https://github.com/Neotys-Connect/neoload-compose
- title: NeoLoad Kube Examples
  url: https://github.com/Neotys-Connect/neoload_kube
toc: |
  - [Publishing Your Contribution](#publishing-your-contribution)
  - [Transferring Your Github Repo](#transferring-your-github-repo)
  - [Limited Liability](#limited-liability)
  - [Intellectual Property and Ownership](#intellectual-property-and-ownership)
  - [Attribution](#attribution)
  - [Examples](#examples)
---

Once you feel like you've gotten to a meaningful milestone in your project, firstly,
 congratulations! It's now time to think about how to let other people know about
 and benefit from your amazing work!

# Publishing Your Contribution

The [Neotys-Connect](https://github.com/Neotys-Connect) organization on Github is the main place for community members
 to host and maintain their contributions. Each project may have it's own repo
 or may factor in to an existing repo depending on the type of project.

# Transferring Your Github Repo

- make sure there is no corporate or proprietary data in your repo
- on Github, go to your repo's settings and use the 'Transfer Ownership' feature (to 'Neotys-Connect')
- the Connect Core Team will receive a request to receive it and will review your repo
- once transferred, you will be made a Maintainer of your project repo
- if you would like to revoke your repo at any time, contact the Connect Core Team

# Limited Liability

Neotys and its affiliates are not responsible for changes made by the community
 to individual repositories. If our terms of service or code of conduct have been
 violated, Neotys and this community reserve the right to remove the offending contribution.

Likewise, content on this site and in the [Neotys-Connect repo](https://github.com/Neotys-Connect) explicitly calls out
 when something is not supported by Neotys AND that individual contributors are
 not responsible for the consequences of using community contributions. See our
 [LICENSE](https://github.com/Neotys-Connect/connect.neotys.com/blob/main/LICENSE)
 for reference, and if you have a project type requiring its own repo,
 you should consider [adding an appropriate license](https://docs.github.com/en/github/building-a-strong-community/adding-a-license-to-a-repository) to it as well.


# Intellectual Property and Ownership

If someone paid you to produce intellectual property and you do not have
 their permission to publish it, ask them. If your company already has external or
 open source contribution policy and process, just make sure that you're following them.

If you the work you did was under the express directive of an employer or client, or
 if it was 'on the clock' time that you used to produce something, just check with
 them first to see if it's okay to publish it. Most of the time, it is, since
 they won't be profiting from others using it too, but it doesn't hurt to check.

If you would like to discuss any of this with the Connect Core Team first, just reach out.

# Attribution

Neotys will never take credit for work you do. We want you and your work to shine and
 for your contributions to positively impact many people.

Because these repos are in Git, the account you use for Git will be on all commits.
 If you want to remain anonymous on Github, use an account that doesn't contain any
 personally identifiable information (PII) and manage your profile settings accordingly.

If you do want special attribution, such as your full name and website or social link,
 we suggest [writing and publishing](/contribute/tutorial) a tutorial for how to use your contribution.

# Examples

<div class="boxed-outer">

{% for article in page.examples %}
  <div class="boxed-category">
    {% include article_link.html article=article %}
  </div>
{% endfor %}

</div>
