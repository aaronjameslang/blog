// apr, period -> effect pr
// effective pr, period -> apr
// effective pr, apr -> period

// 10% APR over 3 years is 1.1^3
// 10% APR over 1/3 year is 1.1^1/3
// r0 p0, r1 p1
// r1 = r0^(p1/p0)

function adaptPercentageRate(duration, percentageRate, duration2) {
    return Math.pow(percentageRate, duration/duration2)
}


interface Period {
    initialDatetimeMs: number,
    initialValue: number,
    finalDatetimeMs: number,
    finalValue: number
}

function calc(p: Period) {
    const {
        initialDatetimeMs,
        initialValue,
        finalDatetimeMs,
        finalValue
    } = p
    const duration = finalDatetimeMs - initialDatetimeMs
    const percentageRate = finalValue / initialValue
    function getPercentageRateForDuration(newDuration: number) {
        return Math.pow(percentageRate, newDuration/duration)
    }
    function getDurationForPercentageRate(newPercentageRate: number) {
        return Math.log(newPercentageRate)/Math.log(percentageRate)*duration
    }
}
