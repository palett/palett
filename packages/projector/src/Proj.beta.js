import { lim0up, rec0up }               from '@aryth/math'
import { hexToHsl, hexToInt }           from '@palett/convert'
import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'
import { scale }                        from './Proj.js'
import { hslToInt }                     from './utils/convert.js'
import { style }                        from './utils/style.js'

/** @typedef {[number,number,number]} Triple */

export class Proj {
  /** @type {string} */ head = ''
  /** @type {string} */ tail = ''
  /** @type {number} */ lo = Number.POSITIVE_INFINITY
  /** @type {number} */ hi = Number.NEGATIVE_INFINITY
  /** @type {Triple} */ min
  /** @type {Triple} */ max
  /** @type {Triple} */ lev
  /** @type {number} */ na

  constructor(preset, bound) {
    if (preset?.effects) style.call(this, preset.effects)
    this.min = hexToHsl(preset.min)
    this.max = hexToHsl(preset.max)
    this.na = hexToInt(preset.na)
    if (bound) {
      this.hi = bound.hi
      this.lo = bound.lo
      this.ready()
    }
  }
  note(val) {
    if (val > this.hi) this.hi = val
    if (val < this.lo) this.lo = val
    return val
  }
  reset() {
    this.lo = Number.POSITIVE_INFINITY
    this.hi = Number.NEGATIVE_INFINITY
  }
  ready() {
    const { lo, hi, min: [ loH, loS, loL ], max: [ hiH, hiS, hiL ] } = this
    const df = hi - lo
    this.lev = df === 0
      ? [ 0, 0, 0 ]
      : [ (hiH - loH) / df, (hiS - loS) / df, (hiL - loL) / df ]
    return this
  }
  clear() {
    this.bound = null
    this.lev = null
  }
  into(val) {
    if (isNaN(val)) return this.na
    const { lo, min: [ loH, loS, loL ], lev: [ lvH, lvS, lvL ] } = this
    const h = rec0up(scale(val, lo, lvH, loH), 360),
          s = lim0up(scale(val, lo, lvS, loS), 100),
          l = lim0up(scale(val, lo, lvL, loL), 100)
    return hslToInt(h, s, l)
  }
  render(val, text) {
    const n = this.into(val)
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    const head = this.head + FORE_INI + SC + r + SC + g + SC + b
    const tail = this.tail + FORE_DEF
    return CSI + head + SGR + text + CSI + tail + SGR // return `[38;2;${head}${r};${g};${b}m${text}[${tail}39m`
  }
}