import { hexToInt }     from '@palett/convert'
import { STR }          from '@typen/enum-data-types'
import { assign, leap } from './iterator-utils.js'
import { Pres }         from './Pres.js'

export class Presm {
  /** @type {number}  int color for NaN         */ #nan
  /** @type {boolean} mon mode: w/o str         */ #mon = true
  /** @type {boolean} unsigned: no pos/neg diff */ #uns = true
  constructor(str, pos, neg, nan) {
    if (str) this.str = str
    if (pos) this.pos = pos
    if (neg) this.neg = neg
    if (nan) this.#nan = nan
    if (pos && neg) this.#uns = false
    if (str) this.#mon = false
  }

  static build(conf) {
    if (conf instanceof Pres) return new Presm(conf, conf)
    if (conf.num || !conf.neg) return new Presm(conf.str, conf.num)
    const { str, pos, neg, nan } = conf
    return new Presm(str, pos, neg, typeof nan === STR ? hexToInt(nan) : str.nan)
  }

  get length() { return 18 }
  get mon() { return this.#mon }
  get uns() { return this.#uns }
  get nan() { return this.#nan }
  get str() { return leap.call(this, 0, 6) }
  get num() { return leap.call(this, 6, 6) }
  get pos() { return leap.call(this, 6, 6) }
  get neg() { return leap.call(this, 12, 6) }

  set nan(int) { this.#nan = int }
  set str(pres) { assign.call(this, 0, 6, ...pres) }
  set num(pres) { assign.call(this, 6, 6, ...pres) }
  set pos(pres) { assign.call(this, 6, 6, ...pres) }
  set neg(pres) { assign.call(this, 12, 6, ...pres) }

  * iterStr(pres) { for (let i = 0; i < 6; i++) yield this[i] }
  * iterNum(pres) { for (let i = 6; i < 12; i++) yield this[i] }
  * iterPos(pres) { for (let i = 6; i < 12; i++) yield this[i] }
  * iterNeg(pres) { for (let i = 12; i < 18; i++) yield this[i] }
  * [Symbol.iterator]() { for (let i = 0; i < 18; i++) yield this[i] }

  toObject() {
    return {
      str: this.str,
      num: this.num,
      pos: this.pos,
      neg: this.neg
    }
  }
}
