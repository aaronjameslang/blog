import Highcharts, {
  Options,
  SeriesLineOptions,
  SeriesScatterOptions,
  SeriesSplineOptions
} from 'highcharts'
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

type Series = SeriesScatterOptions | SeriesSplineOptions | SeriesSplineOptions

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

document.addEventListener('DOMContentLoaded', function () {
  for (const key in options) {
    Highcharts.chart(`chart-${key}`, options[key])
  }
})
