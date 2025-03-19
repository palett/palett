import { hexToHsi, hexToRgi, modHsi, rgiToHsl, hsiToHsl, rgiToRgb, hsiToRgb, rgiToHex, hsiToHex, deltaHsi } from '@palett/convert';
export { deltaHsi, hexToHsi, hsaToInt, hsaToRgi, hsiToHsl, hsiToInt, hsiToRgi, modHsi, modHsiTo, modRgi, rgaToHsi } from '@palett/convert';
import { NUM, STR, OBJ } from '@typen/enum-data-types';
import { betw, flop } from '@aryth/rand';
import { dslHex } from '@palett/color-algebra';
import { minus } from '@aryth/polar';
import { rgbToStr, hslToStr } from '@palett/stringify';
import { init } from '@vect/vector-init';

const GREY = '#CCCCCC';

class Pres {
  /** @type {number} 25 bit HSI */ min
  /** @type {number} 25 bit HSI */ max
  /** @type {number} 24 bit RGI */ nan
  /** @type {string[]} array of effects */ #at

  /**
   * @param {number|string} [min] - hex or HSI(25 bit int)
   * @param {number|string} [max] - hex or HSI(25 bit int)
   * @param {number|string} [nan] - hex or RGI(24 bit int)
   * @param {string[]} [attr] - string[], ansi effect names
   * @param {string} [name]
   */
  constructor(min, max, nan, attr, name) {
    if (typeof min === NUM) { this.min = min; } else if (typeof min === STR) { this.min = hexToHsi(min); }
    if (typeof max === NUM) { this.max = max; } else if (typeof max === STR) { this.max = hexToHsi(max); }
    if (typeof nan === NUM) { this.nan = nan; } else if (typeof nan === STR) { this.nan = hexToRgi(nan); }
    if (!!attr) this.attr = attr;
    if (!!name) this.name = name;
  }
  get attr() { return this.#at }
  set attr(vec) { if (this.#at) { this.#at.length = 0, Object.assign(this.#at, vec); } else { this.#at = vec.slice(); } }
  /**
   * @param {number|string} [min] - hex or HSI(25 bit int)
   * @param {number|string} [max] - hex or HSI(25 bit int)
   * @param {number|string} [nan] - hex or RGI(24 bit int)
   * @param {string[]} [attr] - string[], ansi effect names
   * @param {string} [name]
   * @returns {Pres}
   */
  static build(min, max, nan = GREY, attr, name) {
    return new Pres(min, max, nan, attr, name)
  }
  proj(lever, min, val) {
    const incre = val - min;
    return modHsi(this.min, incre * lever[0], incre * lever[1], incre * lever[2])
  }
  reverse() { return new Pres(this.max, this.min, this.nan, this.#at) }

  * [Symbol.iterator]() {
    yield this.min >> 16 & 0x1FF;
    yield this.min >> 8 & 0xFF;
    yield this.min >> 0 & 0xFF;
    yield this.max >> 16 & 0x1FF;
    yield this.max >> 8 & 0xFF;
    yield this.max >> 0 & 0xFF;
  }

  toHsl() {
    return {
      min: hsiToHsl(this.min),
      max: hsiToHsl(this.max),
      nan: rgiToHsl(this.nan),
    }
  }
  toRgb() {
    return {
      min: hsiToRgb(this.min),
      max: hsiToRgb(this.max),
      nan: rgiToRgb(this.nan),
    }
  }
  toHex() {
    return {
      min: hsiToHex(this.min),
      max: hsiToHex(this.max),
      nan: rgiToHex(this.nan),
    }
  }
}

const LOTONE_LIST = [ '#847F7F', '#B0A29F', '#9A8E88', '#A79B8F', '#C0B7A4', '#ADAB9D', '#949484', '#939681', '#84887B', '#939A8D', '#878F83', '#7B8579', '#AAB0AA', '#9BA59D', '#909C94', '#929F99', '#7E8F89', '#9BA5A3', '#98A3A3', '#909A9C', '#8D969A', '#AEB2B6', '#A9ADB6', '#8A8B93', '#7E7E9A', '#8F8D9A', '#8F8A97', '#7F7787', '#817985', '#988C9B', '#817381', '#70656E', '#777276', '#979093', '#8B7D82', '#8E7F82' ];
/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns Pres
 */
function randPres(hex, name) {
  const next = dslHex(hex, betw(-12, -3), betw(12, 27));
  const gray = flop(LOTONE_LIST);
  return Pres.build(hex, next, gray, null, name)
}

class Presm {
  /** @type {number}  (rgb) int color for NaN  */ #na
  /** @type {number}  x/y/z dimension in 0b111 */ #dm = 0b000

  /**
   * @param {number} xb  - hsi value for x min
   * @param {number} xp  - hsi value for x max
   * @param {number} yb  - hsi value for y min
   * @param {number} yp  - hsi value for y max
   * @param {number} zb  - hsi value for z min
   * @param {number} zp  - hsi value for z max
   * @param {number} nan -  int color for NaN
   */
  constructor(xb, xp, yb, yp, zb, zp, nan) {
    if (typeof xb === NUM && typeof xp === NUM) { this.#dm |= 1 << 0, this[0] = xb, this[1] = xp; }
    if (typeof yb === NUM && typeof yp === NUM) { this.#dm |= 1 << 1, this[2] = yb, this[3] = yp; }
    if (typeof zb === NUM && typeof zp === NUM) { this.#dm |= 1 << 2, this[4] = zb, this[5] = zp; }
    if (typeof nan === NUM) this.#na = nan;
  }
  get hasX() { return this.#dm >> 0 & 0b1 }
  get hasY() { return this.#dm >> 1 & 0b1 }
  get hasZ() { return this.#dm >> 2 & 0b1 }
  get xbd() { return [ this[0], this[1] ] }
  set xbd(pres) { this.#dm |= 1 << 0, this[0] = pres.min, this[1] = pres.max; }
  get ybd() { return [ this[2], this[3] ] }
  set ybd(pres) { this.#dm |= 1 << 1, this[2] = pres.min, this[3] = pres.max; }
  get zbd() { return [ this[4], this[5] ] }
  set zbd(pres) { this.#dm |= 1 << 2, this[4] = pres.min, this[5] = pres.max; }
  get xdf() { return deltaHsi(this[0], this[1]) }
  get ydf() { return deltaHsi(this[2], this[3]) }
  get zdf() { return deltaHsi(this[4], this[5]) }
  get nan() { return this.#na }
  set nan(int) { this.#na = int; }
  get dim() { return this.#dm }
  set dim(dmv) { this.#dm = dmv; }
  get length() { return 18 }
  static build(xbd, ybd, zbd, nan) {
    nan = typeof nan === STR ? hexToRgi(nan) : (nan ?? xbd?.nan ?? ybd?.nan ?? zbd?.nan ?? undefined);
    return new Presm(xbd?.min, xbd?.max, ybd?.min, ybd?.max, zbd?.min, zbd?.max, nan)
  }
  /**
   * Parses a configuration object or string to create a Presm instance.
   *
   * @param {Pres|Presm|string} conf - The configuration object or string.
   * @returns {Presm|null} - a Presm instance or null if the configuration is invalid.
   */
  static create(conf) {
    if (!conf) return null
    if (typeof conf === STR && conf.startsWith('#')) {
      const pres = randPres(conf);
      return Presm.build(pres, pres)
    }
    if (typeof conf === OBJ) {
      if (conf instanceof Pres) return Presm.build(conf, conf)
      if (conf instanceof Presm) return conf
    }
    return null
  }
  * itx() {
    const min = this[0];
    yield min >> 16 & 0x1FF;
    yield min >> 8 & 0xFF;
    yield min >> 0 & 0xFF;
    const max = this[1];
    yield max >> 16 & 0x1FF;
    yield max >> 8 & 0xFF;
    yield max >> 0 & 0xFF;
  }
  * ity() {
    const min = this[2];
    yield min >> 16 & 0x1FF;
    yield min >> 8 & 0xFF;
    yield min >> 0 & 0xFF;
    const max = this[3];
    yield max >> 16 & 0x1FF;
    yield max >> 8 & 0xFF;
    yield max >> 0 & 0xFF;
  }
  * itz() {
    const min = this[4];
    yield min >> 16 & 0x1FF;
    yield min >> 8 & 0xFF;
    yield min >> 0 & 0xFF;
    const max = this[5];
    yield max >> 16 & 0x1FF;
    yield max >> 8 & 0xFF;
    yield max >> 0 & 0xFF;
  }
  * [Symbol.iterator]() { for (let i = 0; i < 6; i++) yield this[i]; }

  toString() {
    const xb = hsiToHsl(this[0]);
    const xp = hsiToHsl(this[1]);
    const yb = hsiToHsl(this[2]);
    const yp = hsiToHsl(this[3]);
    const zb = hsiToHsl(this[4]);
    const zp = hsiToHsl(this[5]);
    return `Presm { x [${xb} → ${xp}] y [${yb} → ${yp}] z [${zb} → ${zp}] }`
  }
  toHex() {
    return { xbd: this.xbd, ybd: this.ybd, zbd: this.zbd }
  }
}

function demoTapeRGB(count) {
  return `${sequence.call(this, count).map(hsi => rgbToStr(hsiToRgb(hsi))).join(' ')} | ${(rgbToStr(rgiToRgb(this.nan)))}`
}

function demoTapeHSL(count) {
  return `${sequence.call(this, count).map(hsi => hslToStr(hsiToHsl(hsi))).join(' ')} | ${(rgbToStr(rgiToRgb(this.nan)))}`
}

function sequence(count = 2) {
  if (count < 2) count = 2;
  const delta = count - 1;
  const pres = this;
  const [ hb, sb, lb, hp, sp, lp ] = pres;
  const lever = [ minus(hp, hb) / delta, (sp - sb) / delta, (lp - lb) / delta ];
  return init(count, i => pres.proj(lever, 0, i))
}

export { Pres, Pres as Preset, Presm, demoTapeRGB as demo, demoTapeHSL, demoTapeRGB, randPres, sequence };
