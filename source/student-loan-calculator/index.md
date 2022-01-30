---
layout: page
title: Student Loan Calculator
---

# Student Loan Calculator

Most graduates in the UK have a significant amount of student debt, but
with low interest and means-based repayments taken directly from their
pay cheques, few ever think about it.

How soon will your loan be re-payed? Should you consider repaying your
student loan early? Here we can answer those questions and more.

## Repayment Plan

Which [plan](https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on)
you're on will determine how much your payments are.

What's your nationality?
<select id="nationality">
  <option value="English">English</option>
  <option value="Irish">Irish</option>
  <option value="Scottish">Scottish</option>
  <option value="Welsh">Welsh</option>
</select>

When did you start your course?
<select id="start-period">
  <option value="1998-2012">Sep 1998 - Sep 2012</option>
  <option value="2012+">Sep 2012 onwards</option>
</select>


## Repayments

For plan 1 the threshold is £1,657 a month, above which [you'll pay 9%](https://www.gov.uk/repaying-your-student-loan/what-you-pay) of your salary.

What's your current yearly income pre-tax?
<input type="number" id="income" step="1000" value="63000" />

Each month you currently repay <span id="payment">?<span>.

Your repayment will go up if your income increases. We'll assume a 10% annual raise every year.

## Interest Charges

Your debt will accrue interest at 1.1% APR.

What's the value of your student loan today? <input type="number" id="principle" step="1000" value="26000.00" />

Each month your debt accrues interest of <span id="interest">?<span>.

## Write Off

Your loan will be written of 25 years after you graduate.

When did you graduate? <input type="number" id="graduation" step="1" value="2013" />

Based on your graduation date, your loan will be written off <span id="write-off-date">?</span>, <span id="write-off-date-relative">?</span>


## Projection

<div id="container" style="width:100%; height:400px;"></div>

Your last payment will be <span id="final-date">?</span>, <span id="final-date-relative">?</span>.

If you paid off your loan in full today, you would save <span id="interest-total">?</span> in interest payments.

If you have any debts at a higher rate or interest, pay those off first. If you have any investments at a higher rate of interests, or can make some, it's not a good idea to pay your student loan of early. If your money stuck in a savings account earnings a lower rate of interest, it's probably a good idea to put some of that towards paying off your loan early, as long as you keep enough savings for emergencies.

---

Figures correct at time of writing, Dec 2021.

<script src="https://code.highcharts.com/9.3/highcharts.src.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/luxon/2.1.1/luxon.js"
integrity="sha512-3sHQdP9q09dJAy4Zul7MNf7PfHr1ywboheIzokq0VaK072iHVy5W4pO3V8ud5m87jtjMLTjyN9EX0j2sh+SnHQ=="
crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="index.js"></script>
