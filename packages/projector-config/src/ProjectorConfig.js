import { hexToHsl }   from '@palett/convert'
import { DyeFactory } from '@palett/dye'
import { HSL }        from '@palett/enum-color-space'
import { parseBound } from './parseBound'

export const leverage = ([x, y, z], delta) => [x / delta, y / delta, z / delta]
export const minus = ([x_, y_, z_], [_x, _y, _z]) => [x_ - _x, y_ - _y, z_ - _z]

/**
 * @typedef {[number,number,number]} HSL
 * @typedef {{min:number,dif:number}} BoundLeap
 * @typedef {{min:HSL,dif:HSL,na:HSL}} PresetHSL
 * @typedef {{max:string,min:string,na:string}} PresetHEX
 */
export class ProjectorConfig {
  /**
   * @param {BoundLeap} boundLeap
   * @param {PresetHSL} presetHsl
   * @param {string[]} effects
   */
  constructor(boundLeap, presetHsl, effects) {
    this.fab = DyeFactory.build(HSL, effects)
    this.lev = leverage(presetHsl.dif, boundLeap.dif)
    this.lo = boundLeap.min
    this.min = presetHsl.min
    this.na = presetHsl.na
  }

  /**
   * @param {Object} bound
   * @param {PresetHEX} preset
   * @param {string[]} effects
   * @returns {ProjectorConfig}
   */
  static build(bound, preset, effects) {
    const
      max = preset.max |> hexToHsl,
      min = preset.min |> hexToHsl,
      na = preset.na |> hexToHsl
    return new ProjectorConfig(parseBound(bound), { min, dif: minus(max, min), na }, effects)
  }
}

// if (!preset) { return new VoidProjectorFactory() } else { preset = presetToLeap(preset) }
// if (!bound.dif) return new SoleProjectorFactory(bound, preset, effects)