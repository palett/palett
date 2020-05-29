import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { presetToLeap }                      from '@palett/util-fluo'
import { boundToLeap }                       from './boundToLeap'
import { hslToDye }                          from './hslToDye'
import { leverage }                          from './leverage'

export const scale = (x, min, lever, base, ceil) =>
  keepCeil((keepFloor(x, min) - min) * lever + base, ceil)

export const projector = function (x) {
  const { min: m, lever: [rH, rS, rL], base: [mH, mS, mL] } = this
  return [scale(x, m, rH, mH, 360), scale(x, m, rS, mS, 100), scale(x, m, rL, mL, 100)]
    |> hslToDye
}
/**
 *
 * @param {{[min]:number,[max]:number,[dif]:number}} bound
 * @param {{max:*,min:*}} preset
 * @returns {function(*):function}
 * @constructor
 */
export const Projector = (bound, preset) => {
  if (!bound) return void 0
  bound = bound |> boundToLeap
  /** @type {{min:number[],dif:number[]}} */ const leap = preset |> presetToLeap
  if (!bound.dif) {
    const dye = hslToDye(leap.min)
    return () => dye
  }
  return projector.bind({
    min: bound.min,
    lever: leverage(leap.dif, bound.dif),
    base: leap.min
  })
}
