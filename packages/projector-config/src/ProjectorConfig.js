import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { hexToHsl }                          from '@palett/convert'
import { DyeFactory }                        from '@palett/dye-factory'
import { HSL }                               from '@palett/enum-color-space'
import { parseBound }                        from './parseBound'

export const leverage = ([x, y, z], delta) => [x / delta, y / delta, z / delta]
export const minus = ([x_, y_, z_], [_x, _y, _z]) => [x_ - _x, y_ - _y, z_ - _z]
export const scale = (x, lo, lev, min, hi) => keepCeil((keepFloor(x, lo) - lo) * lev + min, hi)

/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 * @typedef {{max:string,min:string,na:string,effects?:string[]}} PresetHEX
 * @typedef {{max:Triple,min:Triple,na:Triple,effects?:string[]}} PresetHSL
 * @typedef {{min:Triple,dif:Triple}} LeapHSL
 * @typedef {{min:number,dif:number}} LeapNum
 */
export class ProjectorConfig {
  /** @type {function(Triple):dye} */ fab
  /** @type {number} */ lo
  /** @type {Triple} */ lev
  /** @type {Triple} */ min
  /** @type {Triple} */ nap

  /**
   * @param {LeapNum} leapNum
   * @param {LeapHSL} leapHSL
   * @param {Triple} napHSL
   * @param {string[]} effects
   */
  constructor(leapNum, leapHSL, napHSL, effects) {
    this.fab = DyeFactory.build(HSL, effects)
    this.lo = leapNum.min
    this.lev = !leapNum.dif ? 0 : leverage(leapHSL.dif, leapNum.dif)
    this.min = leapHSL.min
    this.nap = napHSL
  }

  /**
   * @param {Object} bound
   * @param {PresetHEX} preset
   * @returns {ProjectorConfig}
   */
  static fromHEX(bound, preset) {
    const
      max = preset.max |> hexToHsl,
      min = preset.min |> hexToHsl,
      nap = preset.na |> hexToHsl,
      effects = preset.effects
    return new ProjectorConfig(parseBound(bound), { min, dif: minus(max, min) }, nap, effects)
  }
  /**
   * @param {Object} bound
   * @param {PresetHSL} preset
   * @returns {ProjectorConfig}
   */
  static fromHSL(bound, preset) {
    const { max, min, na: nap, effects } = preset
    return new ProjectorConfig(parseBound(bound), { min, dif: minus(max, min) }, nap, effects)
  }

  project(value) {
    const { lo, lev, min } = this
    return [
      scale(value, lo, lev[0], min[0], 360),
      scale(value, lo, lev[1], min[1], 100),
      scale(value, lo, lev[2], min[2], 100)
    ]
  }

  get dyeNAp() { return this.fab(this.nap) }
}