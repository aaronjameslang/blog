---
layout: page
title: Outbound Link Warnings
---
# {{ page.title }}

Often to meet certification requirements or comply with regulations such as SOX
or PCI-DSS, we need to warn users before they follow any link that leads away
from our domain.

Implementing this quickly across multiple sites with limited resources can be
seem daunting, but the script below can be used to meet baseline requirements
quickly. It's not pretty, but it does he job!

Simply include the script below somewhere on your site:

```js
/**
 * This listener detects when a visitor is about to navigate to a
 *   different domain and warns them, with an option to cancel
 *
 * This is required for regulatory compliance
 */
window.addEventListener('click', function (e) {
  function findAnchor(node) {
    if (!node) return node
    if (node.tagName === 'A') return node
    return findAnchor(node.parentNode)
  }

  const anchor = findAnchor(e.target)
  if (!anchor) return
  if (anchor.hostname === window.location.hostname) return
  const leave = window.confirm('You are now leaving ' + window.location.hostname)
  if (!leave) e.preventDefault()
})
```
