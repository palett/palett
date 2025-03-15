import { modHsiTo }           from '@palett/convert'
import { initialize, render } from '@palett/dye'
import { Pres }               from '@palett/pres'

export class Proj {
  /** @type {Pres} */ pres
  /** @type {[*,*,*]|{lo}} */ lev = [ 0, 0, 0 ]

  constructor(pres) {
    initialize.call(this, pres?.attr)
    this.pres = pres
  }
  /** @returns {Proj} */
  static from(bound, preset) { return (new Proj(preset)).load(bound.lo, bound.hi) }

  get nan() { return this.pres.nan }
  load(lo, hi) {
    const df = hi - lo, { pres, lev } = this
    const [ hb, sb, lb, hp, sp, lp ] = pres
    lev[0] = df ? ((hp - hb) / df) : 0
    lev[1] = df ? ((sp - sb) / df) : 0
    lev[2] = df ? ((lp - lb) / df) : 0
    lev.lo = lo
    return this
  }
  into(val) {
    if (isNaN(val)) return this.nan
    // return pres.proj(lev, lev.lo ?? 0, val)
    const df = val - (this.lev.lo ?? 0)
    const [ hlv, slv, llv ] = this.lev
    return modHsiTo(this.pres.min, df * hlv, df * slv, df * llv)
  }
  render(val, text) {
    return render.call(this, this.into(val), text)
  }
}

