import { oneself }                from '@ject/oneself';
import { ProjectorConfig, scale } from '@palett/projector-config';

/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 */

class ProjectorFactory {
  /** @type {function(Triple):dye} */
  fab;
  /** @type {number} */

  lo;
  /** @type {Triple} */

  lev;
  /** @type {Triple} */

  min;
  /** @type {Triple} */

  nap;
  /**
   * @param {Object} config
   * @param {function(Triple):dye} config.fab
   * @param {number}  config.lo
   * @param {Triple}  config.lev
   * @param {Triple}  config.min
   * @param {Triple}  config.nap
   */

  constructor(config) {
    Object.assign(this, config);
  }

  static fromHEX(bound, preset) {
    if (!bound || !preset) {
      return new VoidProjectorFactory();
    }

    const config = ProjectorConfig.fromHEX(bound, preset);
    if (!config.lev) return new SoleProjectorFactory(config);
    return new ProjectorFactory(config);
  }

  static fromHSL(bound, preset) {
    if (!bound || !preset) {
      return new VoidProjectorFactory();
    }

    const config = ProjectorConfig.fromHSL(bound, preset);
    if (!config.lev) return new SoleProjectorFactory(config);
    return new ProjectorFactory(config);
  }

  render(val, text) {
    return this.fab(this.color(val))(text);
  }

  make(val) {
    return this.fab(this.color(val));
  }

  color(val) {
    if (isNaN(val)) return this.nap;
    const {
      lo,
      lev,
      min
    } = this;
    return [scale(val, lo, lev[0], min[0], 360), scale(val, lo, lev[1], min[1], 100), scale(val, lo, lev[2], min[2], 100)];
  }

}
class SoleProjectorFactory {
  /** @type {function(*):dye} */
  fab;
  /** @type {Triple} */

  min;
  /** @type {Triple} */

  nap;

  constructor(config) {
    Object.assign(this, config);
  }

  render(value, text) {
    return this.fab(this.color(value))(text);
  }

  make(value) {
    return this.fab(this.color(value));
  }

  color(value) {
    return isNaN(value) ? this.nap : this.min;
  }

}
class VoidProjectorFactory {
  constructor(config) {
    Object.assign(this, config);
  }

  render(value, text) {
    return text;
  }

  make(value) {
    return oneself;
  }

  color(value) {
    return null;
  }

}

export { ProjectorFactory };
