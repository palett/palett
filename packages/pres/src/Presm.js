import { hexToRgi } from '@palett/convert'
import { STR }      from '@typen/enum-data-types'
import { deltaHsi } from '@palett/convert'

export class Presm {
  /** @type {number}  int color for NaN */ #nan
  /** @type {number}  byte to store dimension info */ #dim = 0b000

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
      zbd: this.zbd
    }
  }
}
