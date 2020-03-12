const RVI = (ticks, period = 10) => {
  let output = []
  let numerators = []
  let denominators = []
  let rvis = []
  for (let i = 0; i < ticks.length; i++) {
    let numerator = 0
    let denominator = 0
    if (i >= 3) {
      numerator = ((ticks[i].close-ticks[i].open) + 2 * (ticks[i-1].close-ticks[i-1].open) + 2 * (ticks[i-2].close-ticks[i-2].open) + (ticks[i-3].close-ticks[i-3].open)) / 6
      denominator = ((ticks[i].high-ticks[i].low) + 2 * (ticks[i-1].high-ticks[i-1].low) + 2 * (ticks[i-2].high-ticks[i-2].low) + (ticks[i-3].high-ticks[i-3].low)) / 6
    }
    numerators.push(numerator)
    denominators.push(denominator)

    let rvi = 0
    if (i>=period+3) {
      const sumNumerators = numerators.slice(i-period,i).reduce((acc, val) => acc+val, 0)
      const sumDenominators= denominators.slice(i-period,i).reduce((acc, val) => acc+val, 0)
      rvi = sumNumerators / sumDenominators
    }
    rvis.push(rvi)

    let signal = 0
    if (i>=period+3+3) {
      signal = (rvis[i] + 2 * rvis[i-1] + 2 * rvis[i-2] + rvis[i-3]) / 6.0
    }

    output.push({
      rvi, 
      signal
    })
  }
  return output
}

module.exports = RVI
