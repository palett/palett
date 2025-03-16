import { deltaHsi, hexToRgi, hsiToHsl } from '@palett/convert'
import { NUM, OBJ, STR }                from '@typen/enum-data-types'
import { Pres }                         from './Pres.js'
import { randPres }                     from './randPres.js'

export class Presm {
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
    if (typeof xb === NUM && typeof xp === NUM) { this.#dm |= 1 << 0, this[0] = xb, this[1] = xp }
    if (typeof yb === NUM && typeof yp === NUM) { this.#dm |= 1 << 1, this[2] = yb, this[3] = yp }
    if (typeof zb === NUM && typeof zp === NUM) { this.#dm |= 1 << 2, this[4] = zb, this[5] = zp }
    if (typeof nan === NUM) this.#na = nan
  }
  get hasX() { return this.#dm >> 0 & 0b1 }
  get hasY() { return this.#dm >> 1 & 0b1 }
  get hasZ() { return this.#dm >> 2 & 0b1 }
  get xbd() { return [ this[0], this[1] ] }
  set xbd(pres) { this.#dm |= 1 << 0, this[0] = pres.min, this[1] = pres.max }
  get ybd() { return [ this[2], this[3] ] }
  set ybd(pres) { this.#dm |= 1 << 1, this[2] = pres.min, this[3] = pres.max }
  get zbd() { return [ this[4], this[5] ] }
  set zbd(pres) { this.#dm |= 1 << 2, this[4] = pres.min, this[5] = pres.max }
  get xdf() { return deltaHsi(this[0], this[1]) }
  get ydf() { return deltaHsi(this[2], this[3]) }
  get zdf() { return deltaHsi(this[4], this[5]) }
  get nan() { return this.#na }
  set nan(int) { this.#na = int }
  get dim() { return this.#dm }
  set dim(dmv) { this.#dm = dmv }
  get length() { return 18 }
  static build(xbd, ybd, zbd, nan) {
    nan = typeof nan === STR ? hexToRgi(nan) : (nan ?? xbd?.nan ?? ybd?.nan ?? zbd?.nan ?? undefined)
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
      const pres = randPres(conf)
      return Presm.build(pres, pres)
    }
    if (typeof conf === OBJ) {
      if (conf instanceof Pres) return Presm.build(conf, conf)
      if (conf instanceof Presm) return conf
    }
    return null
  }
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

  toString() {
    const xb = hsiToHsl(this[0])
    const xp = hsiToHsl(this[1])
    const yb = hsiToHsl(this[2])
    const yp = hsiToHsl(this[3])
    const zb = hsiToHsl(this[4])
    const zp = hsiToHsl(this[5])
    return `Presm { x [${xb} → ${xp}] y [${yb} → ${yp}] z [${zb} → ${zp}] }`
  }
  toHex() {
    return { xbd: this.xbd, ybd: this.ybd, zbd: this.zbd }
  }
}
