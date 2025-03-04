import { hexToInt, intToHex, intToRgb } from '@palett/convert'
import { STR }                          from '@typen/enum-data-types'
import { init }                         from '@vect/vector-init'
import { hexOntoHsl, hslToInt }         from './algebra.js'
import { limFF, scale }                 from './color-utils.js'

const GREY = '#CCCCCC'

export class Pres {
  #nan = 0
  #attr = []
  constructor(min, max, nan) {
    if (min) hexOntoHsl(min, this, 0)
    if (max) hexOntoHsl(max, this, 3)
    if (nan) this.#nan = typeof nan === STR ? hexToInt(nan) : nan
  }

  static build(min, max, nan = GREY) { return new Pres(min, max, nan) }

  static from(preset, attr) {
    const { min, max, nan } = preset
    preset = new Pres(min, max, nan)
    if (attr) preset.attr = attr
    return preset
  }

  get min() { return hslToInt(this[0], this[1], this[2]) }
  get max() { return hslToInt(this[3], this[4], this[5]) }
  get nan() { return this.#nan }
  get attr() { return this.#attr }

  set nan(int) { this.#nan = int }
  set attr(vec) {
    this.#attr.length = 0
    Object.assign(this.#attr, vec)
  }

  range(count = 2) {
    if (count < 2) count = 2
    const gaps = count - 1
    const lev = [ (this[3] - this[0]) / gaps, (this[4] - this[1]) / gaps, (this[5] - this[2]) / gaps ]
    return init(count, i => this.proj(lev, i))
  }
  proj(lever, value) {
    const diff = value - (lever.lo ?? 0)
    return hslToInt(scale(diff, lever[0], this[0]), limFF(diff, lever[1], this[1]), limFF(diff, lever[2], this[2]))
  }
  reverse() { return new Pres(this.max, this.min, this.nan) }

  * [Symbol.iterator]() {
    yield this[0]
    yield this[1]
    yield this[2]
    yield this[3]
    yield this[4]
    yield this[5]
  }

  toInt() { return { min: this.min, max: this.max, nan: this.nan } }
  toRgb() { return { min: intToRgb(this.min), max: intToRgb(this.max), nan: intToRgb(this.nan) } }
  toHex() { return { min: intToHex(this.min), max: intToHex(this.max), nan: intToHex(this.nan) }}
}




