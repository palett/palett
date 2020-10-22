import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { Oneself }                           from '@ject/oneself'
import { DyeFactory }                        from '@palett/dye'
import { HSL }                               from '@palett/enum-color-space'
import { presetToLeap }                      from '@palett/presets'
import { boundToLeap }                       from './helpers/boundToLeap'
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
  const factory = DyeFactory.build(HSL, effects)
  bound = boundToLeap(bound)
  /** @type {{min:number[],dif:number[]}} */ const leap = presetToLeap(preset)
  if (!bound.dif) { return () => factory(leap.min) }
  return projector.bind({ factory, min: bound.min, lever: leverage(leap.dif, bound.dif), base: leap.min })
}

const projector = function (value) {
  const { factory, min, lever: [leverH, leverS, leverL], base: [minH, minS, minL] } = this
  return factory([
    scale(value, min, leverH, minH, 360),
    scale(value, min, leverS, minS, 100),
    scale(value, min, leverL, minL, 100)
  ])
}

const scale = (x, min, lever, base, ceil) => keepCeil((keepFloor(x, min) - min) * lever + base, ceil)
