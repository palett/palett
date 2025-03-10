import { hexToInt }     from '@palett/convert'
import { STR }          from '@typen/enum-data-types'
import { assign, leap } from './iterator-utils.js'
import { Pres }         from '../src/Pres.js'

export class Cubism {
  /** @type {number}  int color for NaN         */ #nan
  /** @type {boolean} mon mode: w/o x         */ #mon = true
  /** @type {boolean} unsigned: no y/z diff */ #uns = true
  constructor(x, y, z, nan) {
    if (x) this.x = x
    if (y) this.y = y
    if (z) this.z = z
    if (nan) this.#nan = nan
    if (y && z) this.#uns = false
    if (x) this.#mon = false
  }

  static build(conf) {
    if (conf instanceof Pres) return new Cubism(conf, conf)
    if (conf.num || !conf.z) return new Cubism(conf.x, conf.num)
    const { x, y, z, nan } = conf
    return new Cubism(x, y, z, typeof nan === STR ? hexToInt(nan) : x.nan)
  }

  get length() { return 18 }
  get mon() { return this.#mon }
  get uns() { return this.#uns }
  get nan() { return this.#nan }
  get x() { return leap.call(this, 0, 2) }
  get y() { return leap.call(this, 2, 2) }
  get z() { return leap.call(this, 4, 2) }

  set nan(int) { this.#nan = int }
  set x(pres) { assign.call(this, 0, 2, ...pres) }
  set y(pres) { assign.call(this, 2, 2, ...pres) }
  set z(pres) { assign.call(this, 4, 2, ...pres) }

  * iterX(pres) { for (let i = 0; i < 2; i++) yield this[i] }
  * iterY(pres) { for (let i = 2; i < 4; i++) yield this[i] }
  * iterZ(pres) { for (let i = 4; i < 6; i++) yield this[i] }
  * [Symbol.iterator]() { for (let i = 0; i < 6; i++) yield this[i] }

  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    }
  }
}
