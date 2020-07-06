import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { Oneself }                           from '@ject/oneself'
import { presetToLeap }                      from '@palett/presets'
import { boundToLeap }                       from './helpers/boundToLeap'
import { hslToDye }                          from './helpers/hslToDye'
import { leverage }                          from './helpers/leverage'

/**
 *
 * @param {{[min]:number,[max]:number,[dif]:number}} bound
 * @param {{max:*,min:*}} preset
 * @param {string[]} [effects]
 * @returns {function(*):Function}
 */
export const Projector = (bound, preset, effects) => {
  if (!bound) return void 0
  if (!preset) return Oneself
  bound = boundToLeap(bound)
  /** @type {{min:number[],dif:number[]}} */ const leap = presetToLeap(preset)
  if (!bound.dif) {
    const dye = hslToDye.call(effects, leap.min)
    return () => dye
  }
  return projector.bind({
    min: bound.min,
    lever: leverage(leap.dif, bound.dif),
    base: leap.min,
    effects: effects
  })
}

const projector = function (x) {
  const { min: m, lever: [rH, rS, rL], base: [mH, mS, mL], effects } = this
  return hslToDye.call(
    effects,
    [scale(x, m, rH, mH, 360), scale(x, m, rS, mS, 100), scale(x, m, rL, mL, 100)]
  )
}

const scale = (x, min, lever, base, ceil) => keepCeil((keepFloor(x, min) - min) * lever + base, ceil)
