import Highcharts, { Options } from 'highcharts'
import {
  linearRegression,
  linearRegressionLine
} from 'simple-statistics'
import ukData from './uk-data.json'

const ukData10y = (function () {
  const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425
  const last = ukData[ukData.length - 1]
  const dawn = last[0] - (MS_PER_YEAR * 10)
  return ukData.filter(([x, y]) => x >= dawn)
})()

const baseOptions: Options = {
  chart: {
    zoomType: 'x'
  },
  legend: {
    enabled: false
  },
  series: [{
    data: ukData,
    name: 'Average UK House Price',
    type: 'spline'
  }],
  title: {
    text: undefined // 'UK House Prices'
  },
  tooltip: {
    shared: true,
    valueDecimals: 2,
    valuePrefix: "£"
  },
  xAxis: {
    title: { text: 'Date' },
    type: 'datetime'
  },
  yAxis: {
    title: { text: 'GBP' }
  },
}

function calcExpTrend(data: number[][]) {
  const logData = data.map(([x, y]) => [x, Math.log(y)])
  const { m, b } = linearRegression(logData)
  const x2y = linearRegressionLine({ m, b })
  const logTrend = data.map(([x, y]) => [x, x2y(x)])
  const trend = logTrend.map(([x, y]) => [x, Math.exp(y)])
  return trend
}

function formatCurrency3sf(value: number) {
  value = Number.parseFloat(value.toPrecision(3))
  return value.toLocaleString('en-GB', {
    style: 'currency', currency: 'GBP'
  })
}

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short'
  })
}

const options: Record<string, Options> = {
  simple: {
    ...baseOptions,
  },
  log: {
    ...baseOptions,
    series: [{
      data: ukData,
      name: 'Price Average',
      type: 'spline'
    }, {
      data: calcExpTrend(ukData),
      name: 'Price Trend',
      type: 'line',
      dashStyle: 'Dash'
    }],
    yAxis: {
      title: { text: 'log(GBP)' },
      type: 'logarithmic'
    },
  },
  'log-10y': {
    ...baseOptions,
    series: [{
      data: ukData10y,
      name: 'Price Average',
      type: 'spline'
    }, {
      data: calcExpTrend(ukData10y),
      name: 'Price Trend',
      type: 'line',
      dashStyle: 'Dash'
    }],
    yAxis: {
      title: { text: 'log(GBP)' },
      type: 'logarithmic'
    },
  }
}

function render() {
  const $ = ([id]: TemplateStringsArray) =>
    document.getElementById(id) ?? document.createElement('p')

  for (const key in options) {
    Highcharts.chart(`chart-${key}`, options[key])
  }

  const last = ukData10y[ukData10y.length - 1]
  const point10y = ukData10y[0]
  const decadePcr = last[1] / point10y[1]
  const annualPcr = Math.pow(decadePcr, 1 / 10)
  $`date-last`.innerText = formatDate(last[0])
  $`date-10y`.innerText = formatDate(point10y[0])
  $`price-last`.innerHTML = formatCurrency3sf(last[1])
  $`price-10y`.innerHTML = formatCurrency3sf(point10y[1])
  $`decade-pr`.innerHTML = (decadePcr * 100 - 100).toPrecision(3)
  $`annual-pr`.innerHTML = (annualPcr * 100 - 100).toPrecision(3)
}

document.addEventListener('DOMContentLoaded', render)
