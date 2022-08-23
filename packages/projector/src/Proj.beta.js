import { Preset }                                     from '@palett/presets'
import { hslToInt, initialize, limFF, render, scale } from './utils/colors.js'

export class Proj {
  /** @type {Preset} */ pre
  /** @type {[*,*,*]|{lo}} */ lev = [ 0, 0, 0 ]

  constructor(preset) {
    initialize.call(this, preset.effects)
    this.pre = preset
  }
  static from(bound, preset) {
    return (new Proj(preset)).load(bound.lo, bound.hi)
  }
  get nan() { return this.pre.nan }
  load(lo, hi) {
    const vdf = hi - lo, { pre, lev } = this
    lev[0] = vdf ? ((pre[3] - pre[0]) / vdf) : 0
    lev[1] = vdf ? ((pre[4] - pre[1]) / vdf) : 0
    lev[2] = vdf ? ((pre[5] - pre[2]) / vdf) : 0
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

export class SignedProj {
  /** @type {Proj} */ pos
  /** @type {Proj} */ neg
  constructor(posPr, negPr) {
    this.pos = new Proj(posPr)
    this.neg = new Proj(negPr)
  }
  load(posBd, negBd) {
    this.pos.load(posBd)
    this.neg.load(negBd)
  }
  into(val) {
    if (val > 0) return this.pos.into(val)
    if (val < 0) return this.neg.into(val)
    return val === 0 ? this.pos.na : this.neg.na
  }
  render(val, text) {
    if (val > 0) return this.pos.render(val, text)
    if (val < 0) return this.neg.render(val, text)
    return val === 0 ? this.pos.render(NaN, text) : this.neg.render(NaN, text)
  }
}