import { hexToInt, intToHex, intToRgb } from '@palett/convert'
import { NUM, OBJ, STR }                from '@typen/enum-data-types'
import { hexToHsi, hsiToInt }           from './color-bitwise.js'

const GREY = '#CCCCCC'

export class Pres {
  min
  max
  nan
  #at = []

  constructor(min, max, nan, attr) {
    if (typeof min === NUM) { this.min = min } else if (typeof min === STR) { this.min = hexToHsi(min) }
    if (typeof max === NUM) { this.max = max } else if (typeof max === STR) { this.max = hexToHsi(max) }
    if (typeof nan === NUM) { this.nan = nan } else if (typeof nan === STR) { this.nan = hexToInt(nan) }
    if (typeof attr === OBJ) { this.#at = attr }
  }

  /**
   * @param {string} [min] - hexadecimal string, value for max
   * @param {string} [max] - hexadecimal string, value for min
   * @param {string} [nan] - hexadecimal string, value for nan
   * @param {string[]} [attr] - array of strings, ansi effect names
   * @returns {Pres}
   */
  static build(min, max, nan = GREY, attr) { return new Pres(min, max, nan, attr) }

  get attr() { return this.#at }
  set attr(vec) { this.#at.length = 0, Object.assign(this.#at, vec) }
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
      min: intToRgb(hsiToInt(this.min)),
      max: intToRgb(hsiToInt(this.max)),
      nan: intToRgb(this.nan)
    }
  }
  toHex() {
    return {
      min: intToHex(hsiToInt(this.min)),
      max: intToHex(hsiToInt(this.max)),
      nan: intToHex(this.nan)
    }
  }
}




