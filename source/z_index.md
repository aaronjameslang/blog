---
layout: page
title: Posts
nav_exclude: true
permalink: /
---

<ul id="posts-list">
{% assign sorted_pages = site.html_pages %}
{% for p in sorted_pages %}
  {% if p.url == "/" %}{% continue %}{% endif %}
  {% if p.url contains "/404" %}{% continue %}{% endif %}
  {% if p.url contains "/demo/" %}{% continue %}{% endif %}
  {% if p.url contains "/tags/" %}{% continue %}{% endif %}
  {% if p.published == false %}{% continue %}{% endif %}
  {% if p.title == nil or p.title == "" %}{% continue %}{% endif %}
  <li><a href="{{ p.url | prepend: site.baseurl }}">{{ p.title }}</a> — {{ p.content | first_sentence }} {% include post_tags.html page=p %}</li>
{% endfor %}
</ul>

<script>
function shuffleList() {
  const list = document.getElementById('posts-list');
  const items = Array.from(list.children);
  
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  
  items.forEach(item => list.appendChild(item));
}

document.addEventListener('DOMContentLoaded', shuffleList);
</script>
