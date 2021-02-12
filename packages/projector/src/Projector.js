import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { oneself, Oneself }                  from '@ject/oneself'
import { hexToHsl }                          from '@palett/convert'
import { DyeFactory }                        from '@palett/dye'
import { HSL }                               from '@palett/enum-color-space'
import { presetToLeap }                      from '@palett/presets'
import { nullish }                           from '@typen/nullish'
import { boundToLeap }                       from './helpers/boundToLeap'
import { leverage }                          from './helpers/leverage'

const BLANC = { max: '#FFFFFF', min: '#FFFFFF', na: null }

export class ProjectorFactory {

  /**
   * @typedef {[number,number,number]} Hsl
   * @param {{min:number,dif:number}} leap
   * @param {{min:Hsl,dif:Hsl,na:?Hsl}} pres
   * @param {string[]} effects
   * @returns {ProjectorFactory}
   */
  constructor(leap, pres, effects) {
    if (leap.dif === 0) return new BinProjectorFactory(leap, pres, effects)
    if (nullish(pres)) return new VoidProjectorFactory()
    this.factory = DyeFactory.build(HSL, effects)
    this.min = leap.min
    this.lever = leverage(pres.dif, leap.dif)
    this.base = pres.min
    this.na = pres.na
  }
  static build(bound = {}, preset = BLANC, effects) {
    bound = bound|> boundToLeap
    preset = preset |> presetToLeap
    return new ProjectorFactory(bound, preset, effects)
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
