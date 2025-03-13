import { deltaHsi, hexToRgi } from '@palett/convert'
import { OBJ, STR }           from '@typen/enum-data-types'
import { Pres }               from './Pres.js'
import { randPres }           from './randPres.js'

export class Presm {
  /** @type {number}  int color for NaN */ #nan
  /** @type {number}  x/y/z dimension info in 0b111 */ #dim = 0b000

  /**
   * @param {Pres} xbd - x bound
   * @param {Pres} ybd - y bound
   * @param {Pres} zbd - z bound
   * @param {number} nan -  int color for NaN
   */
  constructor(xbd, ybd, zbd, nan) {
    if (xbd) { this.xbd = xbd }
    if (ybd) { this.ybd = ybd }
    if (zbd) { this.zbd = zbd }
    if (nan) this.#nan = nan
  }

  static build(xbd, ybd, zbd, nan) {
    nan = nan ?? xbd?.nan ?? ybd?.nan ?? zbd?.nan ?? void 0
    return new Presm(xbd, ybd, zbd, typeof nan === STR ? hexToRgi(nan) : xbd.nan)
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
      const pres = randPres(conf)
      return Presm.build(pres, pres)
    }
    if (typeof conf === OBJ) {
      if (conf instanceof Pres) return Presm.build(conf, conf)
      if (conf instanceof Presm) return conf
    }
    return null
  }

  get hasX() { return this.#dim >> 0 & 0b1 }
  get hasY() { return this.#dim >> 1 & 0b1 }
  get hasZ() { return this.#dim >> 2 & 0b1 }
  get xbd() { return [ this[0], this[1] ] }
  get ybd() { return [ this[2], this[3] ] }
  get zbd() { return [ this[4], this[5] ] }
  get xdf() { return deltaHsi(this[0], this[1]) }
  get ydf() { return deltaHsi(this[2], this[3]) }
  get zdf() { return deltaHsi(this[4], this[5]) }
  get nan() { return this.#nan }
  get dim() { return this.#dim }
  get length() { return 18 }

  set xbd(pres) { this.#dim |= 1 << 0, this[0] = pres.min, this[1] = pres.max }
  set ybd(pres) { this.#dim |= 1 << 1, this[2] = pres.min, this[3] = pres.max }
  set zbd(pres) { this.#dim |= 1 << 2, this[4] = pres.min, this[5] = pres.max }
  set nan(int) { this.#nan = int }

  * itx() {
    const min = this[0]
    yield min >> 16 & 0x1FF
    yield min >> 8 & 0xFF
    yield min >> 0 & 0xFF
    const max = this[1]
    yield max >> 16 & 0x1FF
    yield max >> 8 & 0xFF
    yield max >> 0 & 0xFF
  }
  * ity() {
    const min = this[2]
    yield min >> 16 & 0x1FF
    yield min >> 8 & 0xFF
    yield min >> 0 & 0xFF
    const max = this[3]
    yield max >> 16 & 0x1FF
    yield max >> 8 & 0xFF
    yield max >> 0 & 0xFF
  }
  * itz() {
    const min = this[4]
    yield min >> 16 & 0x1FF
    yield min >> 8 & 0xFF
    yield min >> 0 & 0xFF
    const max = this[5]
    yield max >> 16 & 0x1FF
    yield max >> 8 & 0xFF
    yield max >> 0 & 0xFF
  }
  * [Symbol.iterator]() { for (let i = 0; i < 6; i++) yield this[i] }

  toHex() {
    return {
      xbd: this.xbd,
      ybd: this.ybd,
      zbd: this.zbd,
    }
  }
}
