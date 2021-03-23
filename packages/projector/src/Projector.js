import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { oneself }                           from '@ject/oneself'
import { DyeFactory }                        from '@palett/dye'
import { HSL }                               from '@palett/enum-color-space'
import { presetToLeap }                      from '@palett/presets'
import { nullish }                           from '@typen/nullish'
import { boundToLeap }                       from './helpers/boundToLeap'
import { leverage }                          from './helpers/leverage'

// const BLANC = { max: '#FFFFFF', min: '#FFFFFF', na: null }

export class ProjectorFactory {

  /**
   * @typedef {[number,number,number]} Hsl
   * @param {{min:number,dif:number}} leap
   * @param {{min:Hsl,dif:Hsl,na:?Hsl}} preset
   * @param {string[]} effects
   * @returns {ProjectorFactory}
   */
  constructor(leap, preset, effects) {
    if (nullish(preset)) return new VoidProjectorFactory()
    if (leap.dif === 0) return new BinProjectorFactory(leap, preset, effects)
    this.factory = DyeFactory.build(HSL, effects)
    this.min = leap.min
    this.lever = leverage(preset.dif, leap.dif)
    this.base = preset.min
    this.na = preset.na
  }
  static build(bound, preset) {
    if (!bound) return null
    bound = bound|> boundToLeap
    preset = preset ? preset |> presetToLeap : null
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

export class BinProjectorFactory {
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
  projector.bind(ProjectorFactory.build(bound, { preset, effects }))

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
