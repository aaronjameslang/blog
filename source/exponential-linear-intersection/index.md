---
layout: page
title: Exponential Linear Intersection

---

# Exponential Linear Intersection

For a given exponential curve and a given line, can we know if and where they intersect?

<p>
That is, for two equations \(y\) and \(z\)
\[ y = mx + b \]
\[ z = e^{nx} + c\]
can we solve \(y = z\), or even tell if there is a solution?
\[ mx + b = e^{nx} + c \]
</p><p>
A better mathmatician than I might be able to solve that, but in the meantime let's graph an example. Below \(y\) intersects \(z\), but not \(z'\).
</p>

<script src="https://code.highcharts.com/9.3/highcharts.src.js"></script>

<div id="chart-1" style="width:100%; height:400px;"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const chart = Highcharts.chart('chart-1', {
    chart: { type: 'spline' },
    title: { text: undefined },
    series: [{
      data: [...Array(10).keys()].map(i => [i, i]),
      name: 'y = mx + b'
    }, {
      data: [...Array(10).keys()].map(i => [i, Math.exp(0.25*i)]),
      name: 'z = e^nx + c'
    }, {
      data: [...Array(10).keys()].map(i => [i, Math.exp(0.25*i)+2]),
      name: 'z\' = e^nx + c + 2'
    }]
  });
});
</script>
<p>
Looking at this graph we can see that the exponential gradient starts shallow and ends up steep. And if the curves intersect, it must be at points where there gradients are unequal, else they'd be parralel. Assuming both curves have a positive gradient, at the first intersection the gradient of \(z\) must be less than that of \(y\), and vice versa at the second intersection. And as both curves are smooth, somewhere in between these intersections the gradients must be equal.
</p><p>
Differentiating these functions we get
\[ {dy \over dx} = m \] \[ {dz \over dx} = ne^{nx}\]
and when equated we can easily solve for \(x\)
\[ ne^{nx} = m \]
\[ e^{nx} = { m \over n } \]
\[ nx = \ln { m \over n } \]
\[ nx = \ln m - \ln n \]
\[ x = { \ln m - \ln n \over n } \]
</p>

<p>
So now we know that when \( x = { \ln m - \ln n \over n } \) the lines are parralell, and if the lines intersect at all \(z\) must be less than \(y\) at this point.
</p>

Once we know there the lines intersect, we can resort to numerical methods to find the intersection itself, such as a binary search or the Newton-Raphson method.

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
