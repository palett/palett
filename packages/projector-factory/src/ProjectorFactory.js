import { oneself }      from '@ject/oneself'
import { DyeFactory }   from '@palett/dye'
import { HSL }          from '@palett/enum-color-space'
import { presetToLeap } from '@palett/presets'
import { parseBound }   from '@palett/projector/src/parseBound'
import { leverage }     from '@palett/projector'

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
    bound = parseBound(bound)
    if (!preset) { return new VoidProjectorFactory() } else { preset = presetToLeap(preset) }
    if (!bound.dif) return new SoleProjectorFactory(bound, preset, effects)
    this.fab = DyeFactory.build(HSL, effects)
    this.min = bound.min
    this.lev = leverage(preset.dif, bound.dif)
    this.base = preset.min
    this.na = preset.na
  }
  static build(bound, preset) { return new ProjectorFactory(bound, preset, preset.effects) }
  render(value, text) { return this.fab(this.color(value))(text) }
  make(value) { return this.fab(this.color(value)) }
  color(value) {
    if (isNaN(value)) return this.na
    const { min, lev: [levH, levS, levL], base: [minH, minS, minL] } = this
    return [
      scale(value, min, levH, minH, 360),
      scale(value, min, levS, minS, 100),
      scale(value, min, levL, minL, 100),
    ]
  }
}

export class SoleProjectorFactory {
  constructor(bound, { min, na }, effects) {
    this.fab = DyeFactory.build(HSL, effects)
    this.base = min
    this.na = na
  }
  render(value, text) { return this.fab(this.color(value))(text) }
  make(value) { return this.fab(this.color(value)) }
  color(value) { return isNaN(value) ? this.na : this.base }
}

export class VoidProjectorFactory {
  constructor() {}
  render(value, text) { return text }
  make(value) { return oneself }
  color(value) { return null }
}
