import { hslToDye } from './hslToDye'
import { leverage } from './leverage'

export const amp = (x, min, lever, base) => (x - min) * lever + base

export const dyeBlender = function (x) {
  const { min: m, lever: [rH, rS, rL], base: [mH, mS, mL] } = this
  return [amp(x, m, rH, mH), amp(x, m, rS, mS), amp(x, m, rL, mL)]|> hslToDye
}
/**
 *
 * @param {{min:number,dif:number}} valueLeap
 * @param {{min:number[],dif:number[]}} colorLeap
 * @returns {function(*):function}
 * @constructor
 */
export const BlendDye =
  (valueLeap, colorLeap) =>
    dyeBlender.bind({
      min: valueLeap.min,
      lever: leverage(colorLeap.dif, valueLeap.dif),
      base: colorLeap.min
    })
