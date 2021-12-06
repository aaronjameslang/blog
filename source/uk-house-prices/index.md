---
layout: page
title: UK House Prices
---

# {{ page.title }}

<div id="chart-simple" style="width:100%; height:400px;"></div>

If you're looking to buy a house, you might be interested in what the housing market will look like in the future. By the time you've saved up your deposit, it may no longer be enough to afford the house you want!

Just by glancing at the graph above we can see that house prices go up over the long term, but predicting even a few years ahead is difficult. Trends plotted in 1990 or 2007 would not have been accurate a few years later.

Many finance trends are exponential, so let's look at the above data on a logarithmic scale.

<div id="chart-log" style="width:100%; height:400px;"></div>

Now the same data paints a different picture, if fact in you squint hard enough you can *almost* see a linear trend. Smoother data is easier to predict, and the 2008 financial crash does look a lot less pronounced from this perspective, appearing to be merely a [reversion](https://en.wikipedia.org/wiki/Mean_reversion_(finance)) to the "expected" price. However the 1990s slump is still there, and new irregularities have even appeared, such as the boom in the early 1970s.

> An easing of credit conditions by the Bank of England coupled with the  go-for-growth strategy of the Conservative chancellor, Tony Barber, resulted in house-price inflation peaking at 36%. The average price of a home, which had risen from £2,000 to £5,000 between 1950 and 1970,  doubled in the next three years. The boom ended when the Yom Kippur war and the Opec oil embargo ushered in the stagflation of the mid-1970s.
>
> <cite>L. Elliot, [A brief history of British housing](https://www.theguardian.com/business/2014/may/24/history-british-housing-decade)</cite>

In an effort to find more predictable data, let's limit ourselves to the last 10 years. This is a somewhat abritrary time frame, but does exclude the 2008 crash and some of it's aftershocks.

<div id="chart-log-10y" style="width:100%; height:400px;"></div>

Here we can see that between Oct 2011 and Sep 2021 house prices rose from 165kGBP to almost 260kGBP, that's 57% over the decade or an <abbr title="Annual percentage rate">APR</abbr> of 4.65%.<!-- TODO don't hard code this data -->

<script src="bundle.js"></script>
---

[Data](http://publicdata.landregistry.gov.uk/market-trend-data/house-price-index-data/UK-HPI-full-file-2021-09.csv) courtesy of [HM Land Registry](https://www.gov.uk/government/organisations/land-registry)
