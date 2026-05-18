---
layout: page
title: Posts
nav_exclude: true
---

{% assign sorted_pages = site.html_pages | sort: "title" %}
{% for p in sorted_pages %}
  {% if p.url == "/" %}{% continue %}{% endif %}
  {% if p.url contains "/404" %}{% continue %}{% endif %}
  {% if p.url contains "/demo/" %}{% continue %}{% endif %}
  {% if p.published == false %}{% continue %}{% endif %}
  {% if p.title == nil or p.title == "" %}{% continue %}{% endif %}
- [{{ p.title }}]({{ p.url | prepend: site.baseurl }})
{% endfor %}
