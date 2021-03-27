import { hexToHsl }                                   from '@palett/convert'
import { DyeFactory }                                 from '@palett/dye'
import { HSL }                                        from '@palett/enum-color-space'
import { parseBound }                                 from '@palett/projector/src/parseBound'
import { SoleProjectorFactory, VoidProjectorFactory } from '@palett/projector/src/ProjectorFactory'

export const leverage = ([x, y, z], delta) => [x / delta, y / delta, z / delta]

export class ProjectorConfig {
  /**
   * @typedef {[number,number,number]} HSL
   * @typedef {{min:number,dif:number}} BoundLeap
   * @typedef {{max:HSL,min:HSL,na:HSL}} PresetHSL
   *
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
   * @typedef {{max:string,min:string,na:string}} PresetHEX
   *
   * @param {Object} bound
   * @param {PresetHEX} preset
   * @param {string[]} effects
   * @returns {ProjectorConfig}
   */
  build(bound, preset, effects) {
    bound = parseBound(bound)a
    preset = {
      max: preset.max |> hexToHsl,
      min: preset.min |> hexToHsl,
      na: preset.na |> hexToHsl
    }
    return new ProjectorConfig(bound, preset, effects)
  }
}

// if (!preset) { return new VoidProjectorFactory() } else { preset = presetToLeap(preset) }
// if (!bound.dif) return new SoleProjectorFactory(bound, preset, effects)