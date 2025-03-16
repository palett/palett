import { hexToHsi, hexToRgi, hsiToHex, hsiToHsl, hsiToRgb, modHsi, rgiToHex, rgiToHsl, rgiToRgb } from '@palett/convert'
import {
  NUM, STR,
}                                                                                                 from '@typen/enum-data-types'

const GREY = '#CCCCCC'

export class Pres {
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
    if (typeof min === NUM) { this.min = min } else if (typeof min === STR) { this.min = hexToHsi(min) }
    if (typeof max === NUM) { this.max = max } else if (typeof max === STR) { this.max = hexToHsi(max) }
    if (typeof nan === NUM) { this.nan = nan } else if (typeof nan === STR) { this.nan = hexToRgi(nan) }
    if (!!attr) this.attr = attr
    if (!!name) this.name = name
  }
  get attr() { return this.#at }
  set attr(vec) { if (this.#at) { this.#at.length = 0, Object.assign(this.#at, vec) } else { this.#at = vec.slice() } }
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
    const incre = val - min
    return modHsi(this.min, incre * lever[0], incre * lever[1], incre * lever[2])
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




