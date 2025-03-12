import { hexToHsi, hexToRgi, hsiToRgi, modHsi, rgiToHex, rgiToRgb } from '@palett/convert'
import { NUM, STR }                                                 from '@typen/enum-data-types'

const GREY = '#CCCCCC'

export class Pres {
  /** @type {number} 25 bit HSI */ min
  /** @type {number} 25 bit HSI */ max
  /** @type {number} 24 bit RGI */ nan
  /** @type {string[]} array of effects */ #at

  /**
   * @param {number|string} [min] - hexadecimal string or 25 bit integer HSI, value for max
   * @param {number|string} [max] - hexadecimal string or 25 bit integer HSI, value for min
   * @param {number|string} [nan] - hexadecimal string or 24 bit integer RGI, value for nan
   * @param {string[]} [attr] - array of strings, ansi effect names
   * @param {string} [name]
   */
  constructor(min, max, nan, attr, name) {
    if (typeof min === NUM) { this.min = min } else if (typeof min === STR) { this.min = hexToHsi(min) }
    if (typeof max === NUM) { this.max = max } else if (typeof max === STR) { this.max = hexToHsi(max) }
    if (typeof nan === NUM) { this.nan = nan } else if (typeof nan === STR) { this.nan = hexToRgi(nan) }
    if (!!attr) this.attr = attr
    if (!!name) this.name = name
  }

  /**
   * @param {number|string} [min] - hexadecimal string or 25 bit integer HSI, value for max
   * @param {number|string} [max] - hexadecimal string or 25 bit integer HSI, value for min
   * @param {number|string} [nan] - hexadecimal string or 24 bit integer RGI, value for nan
   * @param {string[]} [attr] - array of strings, ansi effect names
   * @param {string} [name]
   * @returns {Pres}
   */
  static build(min, max, nan = GREY, attr, name) {
    return new Pres(min, max, nan, attr, name)
  }

  get attr() { return this.#at }
  set attr(vec) { if (this.#at) { this.#at.length = 0, Object.assign(this.#at, vec) } else { this.#at = vec.slice() } }

  proj(lev, min, val) {
    const df = val - min
    return modHsi(this.min, df * lev[0], df * lev[1], df * lev[2])
  }
  reverse() { return new Pres(this.max, this.min, this.nan, this.#at) }

  * [Symbol.iterator]() {
    yield this.min >> 16 & 0x1FF
    yield this.min >> 8 & 0xFF
    yield this.min >> 0 & 0xFF
    yield this.max >> 16 & 0x1FF
    yield this.max >> 8 & 0xFF
    yield this.max >> 0 & 0xFF
  }

  toRgb() {
    return {
      min: rgiToRgb(hsiToRgi(this.min)),
      max: rgiToRgb(hsiToRgi(this.max)),
      nan: rgiToRgb(this.nan)
    }
  }
  toHex() {
    return {
      min: rgiToHex(hsiToRgi(this.min)),
      max: rgiToHex(hsiToRgi(this.max)),
      nan: rgiToHex(this.nan)
    }
  }
}




