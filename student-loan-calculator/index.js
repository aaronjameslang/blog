function formatCurrency(value) {
  return value.toLocaleString('en-GB', {
    style: 'currency', currency: 'GBP'
  })
}

function formatDate(ms) {
  return new Date(ms).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long'
  })
}

function formatDateRelative(ms) {
  return luxon.DateTime.fromMillis(ms).toRelative()
}

function calcPayment(income) {
  return ((income / 12) - 1657) * 0.09
}

function calcInterest(balance) {
  return balance * (Math.pow(1.011, 1 / 12) - 1)
}

const chart = Highcharts.chart('container', {
  chart: { type: 'spline' },
  title: { text: undefined },
  spline: { marker: { enabled: false } },
  xAxis: { type: 'datetime' },
  yAxis: { title: undefined, min: 0 },
  series: [{
    name: 'Loan Balance',
    marker: { enabled: false }
  }, {
    name: 'Total Payments',
    marker: { enabled: false }
  }, {
    name: 'Monthly Payments',
    marker: { enabled: false }
  }, {
    name: 'Monthly Income',
    marker: { enabled: false }
  }]
});

function render() {
  const $ = id => document.getElementById(id)

  const income = Number.parseFloat($`income`.value)
  const payment = calcPayment(income)
  $`payment`.innerText = formatCurrency(payment)

  const principle = Number.parseFloat($`principle`.value)
  const interest = calcInterest(principle)
  $`interest`.innerText = formatCurrency(interest)

  const graduation = Number.parseFloat($`graduation`.value)
  const writeOffYear = graduation + 25 + 1
  const writeOffMonth = 3 // April
  const writeOff = new Date(writeOffYear, writeOffMonth).getTime()
  $`write-off-date`.innerText = formatDate(writeOff)
  $`write-off-date-relative`.innerText = formatDateRelative(writeOff)

  const now = Date.now()
  let then = now
  let balanceTotal = principle
  let paymentTotal = 0
  let balanceTotalData = [[now, balanceTotal]]
  let paymentTotalData = [[now, 0]]
  let paymentData = []
  let incomeData = [[now, income / 12]]

  for (
    let year = new Date().getFullYear();
    year <= writeOff && balanceTotal >= 0;
    year += 1
  ) {
    for (
      let month = 0;
      month < 12 && balanceTotal >= 0;
      month += 1
    ) {
      then = new Date(year, month, 1).getTime()
      const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425
      const yearsHence = Math.floor((then - Date.now()) / MS_PER_YEAR)
      if (yearsHence < 0) continue
      const incomeThen = income * Math.pow(1.1, yearsHence)
      const paymentThen = calcPayment(incomeThen)
      balanceTotal -= paymentThen
      paymentTotal += paymentThen
      const interestThen = calcInterest(balanceTotal)
      balanceTotal += interestThen
      balanceTotalData.push([then, balanceTotal])
      paymentTotalData.push([then, paymentTotal])
      paymentData.push([then, paymentThen])
      incomeData.push([then, incomeThen / 12])
    }
  }

  chart.series[0].setData(balanceTotalData)
  chart.series[1].setData(paymentTotalData)
  chart.series[2].setData(paymentData)
  chart.series[3].setData(incomeData)

  $`final-date`.innerText = formatDate(then)
  $`final-date-relative`.innerText = formatDateRelative(then)

  $`interest-total`.innerText = formatCurrency(paymentTotal - principle)
}

document.addEventListener('change', render)
document.addEventListener('DOMContentLoaded', render)
