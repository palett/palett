import { initialize }                           from '@palett/dye'
import { hslToInt, limFF, Pres, render, scale } from '@palett/presets'

export class Proj {
  /** @type {Pres} */ pre
  /** @type {[*,*,*]|{lo}} */ lev = [ 0, 0, 0 ]

  constructor(preset) {
    initialize.call(this, preset?.attr)
    this.pre = preset
  }
  /** @returns {Proj} */
  static from(bound, preset) { return (new Proj(preset)).load(bound.lo, bound.hi) }

  get nan() { return this.pre.nan }
  load(lo, hi) {
    const df = hi - lo, { pre, lev } = this
    const [ hb, sb, lb, hp, sp, lp ] = pre
    lev[0] = df ? ((hp - hb) / df) : 0
    lev[1] = df ? ((sp - sb) / df) : 0
    lev[2] = df ? ((lp - lb) / df) : 0
    lev.lo = lo
    return this
  }
  into(val) {
    if (isNaN(val)) return this.nan
    const { lev, pre } = this, vdf = val - (lev.lo ?? 0)
    return hslToInt(scale(vdf, lev[0], pre[0]), limFF(vdf, lev[1], pre[1]), limFF(vdf, lev[2], pre[2]))
  }
  render(val, text) {
    return render.call(this, this.into(val), text)
  }
}

