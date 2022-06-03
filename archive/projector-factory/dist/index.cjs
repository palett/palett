'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var oneself = require('@ject/oneself');
var projectorConfig = require('@palett/projector-config');

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

    const config = projectorConfig.ProjectorConfig.fromHEX(bound, preset);
    if (!config.lev) return new SoleProjectorFactory(config);
    return new ProjectorFactory(config);
  }

  static fromHSL(bound, preset) {
    if (!bound || !preset) {
      return new VoidProjectorFactory();
    }

    const config = projectorConfig.ProjectorConfig.fromHSL(bound, preset);
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
    return [projectorConfig.scale(val, lo, lev[0], min[0], 360), projectorConfig.scale(val, lo, lev[1], min[1], 100), projectorConfig.scale(val, lo, lev[2], min[2], 100)];
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
    return oneself.oneself;
  }

  color(value) {
    return null;
  }

}

exports.ProjectorFactory = ProjectorFactory;
