import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { oneself }                           from '@ject/oneself'
import { DyeFactory }                        from '@palett/dye'
import { HSL }                               from '@palett/enum-color-space'
import { presetToLeap }                      from '@palett/presets'
import { boundToLeap }                       from './helpers/boundToLeap'
import { leverage }                          from './helpers/leverage'

export class ProjectorFactory {

  /**
   * @typedef {[number,number,number]} Hsl
   * @param {{min:number,dif:number}} bound
   * @param {{min:Hsl,dif:Hsl,na:?Hsl}} preset
   * @param {string[]} effects
   * @returns {ProjectorFactory}
   */
  constructor(bound, preset, effects) {
    if (!bound) return null
    bound = boundToLeap(bound)
    if (!preset) { return new VoidProjectorFactory()} else { preset = presetToLeap(preset) }
    if (!bound.dif) return new SoleProjectorFactory(bound, preset, effects)
    this.factory = DyeFactory.build(HSL, effects)
    this.min = bound.min
    this.lever = leverage(preset.dif, bound.dif)
    this.base = preset.min
    this.na = preset.na
  }
  static build(bound, preset) {
    return new ProjectorFactory(bound, preset, preset.effects)
  }
  render(value, text) { return this.factory(this.color(value))(text) }
  make(value) { return this.factory(this.color(value)) }
  color(value) {
    if (isNaN(value)) return this.na
    const { min, lever: [levH, levS, levL], base: [minH, minS, minL] } = this
    return [
      scale(value, min, levH, minH, 360),
      scale(value, min, levS, minS, 100),
      scale(value, min, levL, minL, 100),
    ]
  }
}

export class SoleProjectorFactory {
  constructor(bound, { min, na }, effects) {
    this.factory = DyeFactory.build(HSL, effects)
    this.base = min
    this.na = na
  }
  render(value, text) { return this.factory(this.color(value))(text) }
  make(value) { return this.factory(this.color(value)) }
  color(value) { return isNaN(value) ? this.na : this.base }
}

export class VoidProjectorFactory {
  constructor() {}
  render(value, text) { return text }
  make(value) { return oneself }
  color(value) { return null }
}


/**
 *
 * @param {{[min]:number,[max]:number,[dif]:number}} bound
 * @param {{max:*,min:*}} preset
 * @param {string[]} [effects]
 * @returns {function(*):Function}
 */
export const Projector = (bound, preset, effects) =>
  projector.bind(ProjectorFactory.build(bound, preset, effects))

const projector = function (value) {
  const { factory, min, lever: [levH, levS, levL], base: [minH, minS, minL], na } = this
  return factory(na
    ? this.base
    : [
      scale(value, min, levH, minH, 360),
      scale(value, min, levS, minS, 100),
      scale(value, min, levL, minL, 100)
    ]
  )
}

const scale = (x, min, lever, base, ceil) => keepCeil((keepFloor(x, min) - min) * lever + base, ceil)
