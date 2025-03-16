import { lim0up, rec0up } from '@aryth/math'
import { oneself }        from '@ject/oneself'
import { hexToHsl }       from '@palett/convert'
import { HslDye }         from '@palett/dye'
import { lever, minus }   from './triplet.js'

export function scale(x, xLo, lev, yLo) { return x < xLo ? yLo : (x - xLo) * lev + yLo }

/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 */

export class Proj {
  /** @type {Dye}    */ dye
  /** @type {number} */ lo
  /** @type {Triple} */ lev
  /** @type {Triple} */ min
  /** @type {Triple} */ na

  constructor(lo, hi, loHSL, hiHSL, naHSL, effects) {
    this.dye = HslDye.init().style(effects)
    this.lo = lo
    this.lev = hi === lo ? 0 : lever(minus(hiHSL, loHSL), hi - lo)
    this.min = loHSL
    this.na = naHSL
  }
  static from(bound, preset) {
    if (!bound || !preset) { return new VoidProj() }
    const lo = bound.min,
      hi = bound.max ?? (bound.min + bound.dif)
    const { max, min, na, effects } = preset
    return lo === hi
      ? new SoleProj(hexToHsl(min), hexToHsl(na), effects)
      : new Proj(lo, hi, hexToHsl(min), hexToHsl(max), hexToHsl(na), effects)
  }
  /** @deprecated use Proj.from(bound, preset) instead */
  static fromHEX(bound, preset) { return Proj.from(bound, preset) }
  static fromHSL(bound, preset) {
    if (!bound || !preset) { return new VoidProj() }
    const lo = bound.min, hi = bound.max ?? (bound.min + bound.dif)
    const { max, min, na, effects } = preset
    return lo === hi
      ? new SoleProj(min, na, effects)
      : new Proj(lo, hi, min, max, na, effects)
  }
  /** @deprecated use into instead */
  color(val) {return this.into(val) }
  into(val) {
    if (isNaN(val)) return this.na
    const { lo, lev, min } = this
    return [
      rec0up(scale(val, lo, lev[0], min[0]), 360),
      lim0up(scale(val, lo, lev[1], min[1]), 100),
      lim0up(scale(val, lo, lev[2], min[2]), 100),
    ]
  }
  make(val) { return this.dye.make(this.into(val)) }
  render(val, text) { return this.dye.render(this.into(val), text) }
}

export class SoleProj extends Proj {
  constructor(loHSL, naHSL, effects) { super(0, 0, loHSL, null, naHSL, effects) }
  // render(val, text) { return this.fab(this.color(val))(text) }
  // make(val) { return this.fab(this.color(val)) }
  into(val) { return isNaN(val) ? this.na : this.min }
}

export class VoidProj extends Proj {
  constructor() { super(0, 0, null, null, null) }
  render(val, text) { return text }
  make(val) { return oneself }
  into(val) { return null }
}