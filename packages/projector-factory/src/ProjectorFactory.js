import { oneself }                from '@ject/oneself'
import { scale, ProjectorConfig } from '@palett/projector-config'

/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 */

export class ProjectorFactory {
  /** @type {function(Triple):dye} */ fab
  /** @type {number} */ lo
  /** @type {Triple} */ lev
  /** @type {Triple} */ min
  /** @type {Triple} */ nap

  /**
   * @param {Object} config
   * @param {function(Triple):dye} config.fab
   * @param {number}  config.lo
   * @param {Triple}  config.lev
   * @param {Triple}  config.min
   * @param {Triple}  config.nap
   */
  constructor(config) {
    Object.assign(this, config)
  }
  static fromHEX(bound, preset) {
    if (!bound || !preset) { return new VoidProjectorFactory() }
    const config = ProjectorConfig.fromHSL(bound, preset)
    if (!config.lev) return new SoleProjectorFactory(config)
    return new ProjectorFactory(ProjectorConfig.fromHEX(bound, preset))
  }
  static fromHSL(bound, preset) {
    if (!bound || !preset) { return new VoidProjectorFactory() }
    const config = ProjectorConfig.fromHSL(bound, preset)
    if (!config.lev) return new SoleProjectorFactory(config)
    return new ProjectorFactory(config)
  }

  render(value, text) { return this.fab(this.color(value))(text) }
  make(value) { return this.fab(this.color(value)) }
  color(value) {
    if (isNaN(value)) return this.nap
    const { lo, lev, min } = this
    return [
      scale(value, lo, lev[0], min[0], 360),
      scale(value, lo, lev[1], min[1], 100),
      scale(value, lo, lev[2], min[2], 100),
    ]
  }
}

export class SoleProjectorFactory {
  /** @type {function(*):dye} */ fab
  /** @type {Triple} */ min
  /** @type {Triple} */ nap

  constructor(config) { Object.assign(this, config) }
  render(value, text) { return this.fab(this.color(value))(text) }
  make(value) { return this.fab(this.color(value)) }
  color(value) { return isNaN(value) ? this.nap : this.min }
}

export class VoidProjectorFactory {
  constructor(config) { Object.assign(this, config) }
  render(value, text) { return text }
  make(value) { return oneself }
  color(value) { return null }
}

// if (!preset) { return new VoidProjectorFactory() } else { preset = presetToLeap(preset) }
// if (!bound.dif) return new SoleProjectorFactory(bound, preset, effects)
