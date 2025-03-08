import { hexToInt, intToHex, intToRgb } from '@palett/convert'
import { NUM, OBJ, STR }              from '@typen/enum-data-types'
import { hexToHsi, hsiToRgi, modHsi } from './color-bitwise.js'

const GREY = '#CCCCCC'

export class Pres {
  /** @type {number} 25 bit HSI */ min
  /** @type {number} 25 bit HSI */ max
  /** @type {number} 24 bit RGI */ nan
  /** @type {string[]} array of effects */ #at = []

  /**
   * @param {number|string} [min] - hexadecimal string or 25 bit integer HSI, value for max
   * @param {number|string} [max] - hexadecimal string or 25 bit integer HSI, value for min
   * @param {number|string} [nan] - hexadecimal string or 24 bit integer RGI, value for nan
   * @param {string[]} [attr] - array of strings, ansi effect names
   */
  constructor(min, max, nan, attr) {
    if (typeof min === NUM) { this.min = min } else if (typeof min === STR) { this.min = hexToHsi(min) }
    if (typeof max === NUM) { this.max = max } else if (typeof max === STR) { this.max = hexToHsi(max) }
    if (typeof nan === NUM) { this.nan = nan } else if (typeof nan === STR) { this.nan = hexToInt(nan) }
    if (typeof attr === OBJ) { this.#at = attr }
  }

  /**
   * @param {number|string} [min] - hexadecimal string or 25 bit integer HSI, value for max
   * @param {number|string} [max] - hexadecimal string or 25 bit integer HSI, value for min
   * @param {number|string} [nan] - hexadecimal string or 24 bit integer RGI, value for nan
   * @param {string[]} [attr] - array of strings, ansi effect names
   * @returns {Pres}
   */
  static build(min, max, nan = GREY, attr) { return new Pres(min, max, nan, attr) }

  get attr() { return this.#at }
  set attr(vec) { this.#at.length = 0, Object.assign(this.#at, vec) }

  proj(lev, min, val) {
    const df = val - min, hlv = lev[0], slv = lev[1], llv = lev[2]
    return modHsi(this.min, df * hlv, df * slv, df * llv)
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
      min: intToRgb(hsiToRgi(this.min)),
      max: intToRgb(hsiToRgi(this.max)),
      nan: intToRgb(this.nan)
    }
  }
  toHex() {
    return {
      min: intToHex(hsiToRgi(this.min)),
      max: intToHex(hsiToRgi(this.max)),
      nan: intToHex(this.nan)
    }
  }
}




