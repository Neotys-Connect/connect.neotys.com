---
layout: article
title: Creating and Sharing a Tutorial
permalink: /contribute/tutorial
examples:
- title: Deploying NeoLoad Web in AWS
  url: /tutorials/deploying-neoload-web-in-aws
toc: |
  - [Getting Started](#getting-started)
  - [A Few Key Pointers](#a-few-key-pointers)
  - [Once You're Ready to Publish](#once-youre-ready-to-publish)
    * [DIY (Do It Yourself) Method](#diy-do-it-yourself-method)
    * [Non-DIY Method (send us your doc)](#non-diy-method-send-us-your-doc)
  - [Examples](#examples)
---

# Getting Started

A tutorial's goal is to make someone successful within a particular scope that matters to them.
Its can be short or long. It depends on the complexity of the process or use case
 you're helping someone understand.

Tutorials are not the same as standard *product* documentation which are usually feature descriptions
 and point samples to explain *how* a thing works.

The focus of a *good tutorial* is always the person reading it, not simply the technology.
 People need to understand *why* they are going through the steps, not just how to do.

# A Few Key Pointers

- provide a short, but descriptive title
- have a purpose statement at the top; "what this is for and what you will end up with"
- have a TL;DR (too long, didn't read) version of the process and outcome at the top
- if the document requires scrolling, have a table of contents with the main sections
- don't repeat yourself except if it's a step that confirms you're on the right track
- consider following the [Google Documentation Style Guide](https://developers.google.com/style) for everything else

Use whatever editor you feel comfortable with, but keep in mind that to publish
 it on this site, it will eventually need to become Markdown. This site is hosted
 via Github Pages and backed by a [public repository]() to encourage collaboration.
 Github Pages uses Jekyll and Liquid rendering, which you can find documentation on
 [here]().

# Once You're Ready to Publish

Once you're done, firstly, congratulations! That is a milestone you should be proud of.
 The next step is to get it published to this site.

## DIY (Do It Yourself) Method

If you want to try to add your tutorial to this site yourself, there are some things
 you'll need to do first:

- have a working knowledge of git command line tools on your own workstation
- have your own github account
- familiarize yourself with and follow the [Contribution Guidelines](https://github.com/Neotys-Connect/connect.neotys.com/blob/main/CONTRIBUTING.md)
- feel free to reach out to our {% include core-team-link.md %} afterwards

> "I tend to write my tutorials in Google docs so that I can share and collaborate
> in the early phases with other contributors, paste in images, basically just
> get down to the work of writing for the reader. Once done, I use the 'Docs to
> Markdown' Google Add-in to convert it to markdown. I also get extracts of images
> by exporting to either Word or HTML zipped and locally unzip those to get
> all the images with the right names. Then I put the markdown and the images
> in a new subdirectory under my local copy of the connect site repo fork, fix up the
> image urls with search and replace to point to the ones now in the repo, and
> that's it. I also check the new content locally by running Jekyll serve and
> looking at it in my own browser before making a pull request back to Git repo.
>                           - Paul Bruce, Dir. of Customer Engineering, Neotys

## Non-DIY Method (send us your doc)

If the above seems too daunting for you, that's okay too. It's better for your
 contribution to see the light of day than to be stuck somewhere it doesn't do
 anyone else good. Feel free to send your contributions to our {% include core-team-link.md %}.

# Examples

<div class="boxed-outer">

{% for article in page.examples %}
  <div class="boxed-category">
    {% include article_link.html article=article %}
  </div>
{% endfor %}

</div>
