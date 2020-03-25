import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { hslToDye } from './hslToDye'
import { leverage } from './leverage'

export const scale = (x, min, lever, base, ceil) =>
  keepCeil((keepFloor(x, min) - min) * lever + base, ceil)

export const dyeBlender = function (x) {
  const { min: m, lever: [rH, rS, rL], base: [mH, mS, mL] } = this
  return [scale(x, m, rH, mH, 360), scale(x, m, rS, mS, 100), scale(x, m, rL, mL, 100)]
    |> hslToDye
}
/**
 *
 * @param {{min:number,dif:number}} valueLeap
 * @param {{min:number[],dif:number[]}} colorLeap
 * @returns {function(*):function}
 * @constructor
 */
export const BlendDye = (valueLeap, colorLeap) =>
  dyeBlender.bind({
    min: valueLeap.min,
    lever: leverage(colorLeap.dif, valueLeap.dif),
    base: colorLeap.min
  })
