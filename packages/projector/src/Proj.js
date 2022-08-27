import { initialize }                             from '@palett/dye'
import { hslToInt, limFF, Preset, render, scale } from '@palett/presets'

export class Proj {
  /** @type {Preset} */ pre
  /** @type {[*,*,*]|{lo}} */ lev = [ 0, 0, 0 ]

  constructor(preset) {
    initialize.call(this, preset?.attr)
    this.pre = preset
  }
  /** @returns {Proj} */
  static from(bound, preset) { return (new Proj(preset)).load(bound.lo, bound.hi) }

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

