import { min, max } from '@aryth/comparer';
import { hexToHsl } from '@palett/convert';
import { DyeFab }   from '@palett/dye';
import { valid }    from '@typen/nullish';

/**
 *
 * @param {Object} bound
 * @param {number} [bound.min] - if min: if dif, return {min,dif}; if max, return calculated {min,dif}
 * @param {number} [bound.dif] - if dif: if max, return calculated {min,dif}; else return {min:0,dif}
 * @param {number} [bound.max] - if max: return {min:0,dif:max}; else return {min:0,dif:0}
 * @return {{dif: number, min: number}}
 */

const parseBound = bound => {
  // if (!bound) return { min: 0, dif: 0 }
  let {
    min,
    max,
    dif
  } = bound;

  if (valid(min)) {
    if (valid(dif)) return {
      min,
      dif
    };
    if (valid(max)) return {
      min,
      dif: max - min
    };
  }

  if (valid(dif)) {
    if (valid(max)) return {
      min: max - dif,
      dif
    };
    return {
      min: 0,
      dif
    };
  }

  if (valid(max)) return {
    min: 0,
    dif: max
  };
  return {
    min: 0,
    dif: 0
  };
};

const leverage = ([x, y, z], delta) => [x / delta, y / delta, z / delta];
const minus = ([x_, y_, z_], [_x, _y, _z]) => [x_ - _x, y_ - _y, z_ - _z];
const scale = (x, lo, lev, min$1, hi) => min((max(x, lo) - lo) * lev + min$1, hi);
/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 * @typedef {{max:string,min:string,na:string,effects?:string[]}} PresetHEX
 * @typedef {{max:Triple,min:Triple,na:Triple,effects?:string[]}} PresetHSL
 * @typedef {{min:Triple,dif:Triple}} LeapHSL
 * @typedef {{min:number,dif:number}} LeapNum
 */

class ProjectorConfig {
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
   * @param {LeapNum} leapNum
   * @param {LeapHSL} leapHSL
   * @param {Triple} napHSL
   * @param {string[]} effects
   */

  constructor(leapNum, leapHSL, napHSL, effects) {
    const dye = DyeFab.hsl.apply(null, effects);
    this.fab = dye.make.bind(dye);
    this.lo = leapNum.min;
    this.lev = !leapNum.dif ? 0 : leverage(leapHSL.dif, leapNum.dif);
    this.min = leapHSL.min;
    this.nap = napHSL;
  }
  /**
   * @param {Object} bound
   * @param {PresetHEX} preset
   * @returns {ProjectorConfig}
   */


  static fromHEX(bound, preset) {
    var _preset$max, _preset$min, _preset$na;

    const max = (_preset$max = preset.max, hexToHsl(_preset$max)),
          min = (_preset$min = preset.min, hexToHsl(_preset$min)),
          nap = (_preset$na = preset.na, hexToHsl(_preset$na)),
          effects = preset.effects;
    return new ProjectorConfig(parseBound(bound), {
      min,
      dif: minus(max, min)
    }, nap, effects);
  }
  /**
   * @param {Object} bound
   * @param {PresetHSL} preset
   * @returns {ProjectorConfig}
   */


  static fromHSL(bound, preset) {
    const {
      max,
      min,
      na: nap,
      effects
    } = preset;
    return new ProjectorConfig(parseBound(bound), {
      min,
      dif: minus(max, min)
    }, nap, effects);
  }

  project(val) {
    const {
      lo,
      lev,
      min
    } = this;
    return [scale(val, lo, lev[0], min[0], 360), scale(val, lo, lev[1], min[1], 100), scale(val, lo, lev[2], min[2], 100)];
  }

  get dyeNAp() {
    return this.fab(this.nap);
  }

}

export { ProjectorConfig, scale };
