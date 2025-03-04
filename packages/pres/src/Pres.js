import { hexToInt, intToRgb }   from '@palett/convert'
import { init }                 from '@vect/vector-init'
import { hexOntoHsl, hslToInt } from './algebra.js'
import { limFF, scale }         from './utils.js'

const GREY = '#CCCCCC'

export class Pres {
  nan = 0
  constructor(min, max, nan) {
    hexOntoHsl(min, this, 0)
    hexOntoHsl(max, this, 3)
    if (nan) this.nan = hexToInt(nan)
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
  reverse() { return Pres.build(this.max, this.min, this.nan) }
  range(count = 2) {
    if (count < 2) count = 2
    const gaps = count - 1
    const lev = [ (this[3] - this[0]) / gaps, (this[4] - this[1]) / gaps, (this[5] - this[2]) / gaps ]
    return init(count, i => this.proj(lev, i))
  }
  proj(lev, val) {
    const vdf = val - (lev.lo ?? 0)
    return hslToInt(scale(vdf, lev[0], this[0]), limFF(vdf, lev[1], this[1]), limFF(vdf, lev[2], this[2]))
  }
}




