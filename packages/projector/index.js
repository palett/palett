import { modHsiTo } from '@palett/convert';
import { initialize, render } from '@palett/dye';
import '@palett/pres';

class Proj {
  /** @type {Pres} */ pres
  /** @type {[*,*,*]|{lo}} */ lev = [ 0, 0, 0 ]

  constructor(pres) {
    initialize.call(this, pres?.attr);
    this.pres = pres;
  }
  get nan() { return this.pres.nan }
  /** @returns {Proj} */
  static from(bound, preset) { return (new Proj(preset)).load(bound.lo, bound.hi) }
  load(lo, hi) {
    const df = hi - lo, { pres, lev } = this;
    const [ hb, sb, lb, hp, sp, lp ] = pres;
    lev[0] = df ? ((hp - hb) / df) : 0;
    lev[1] = df ? ((sp - sb) / df) : 0;
    lev[2] = df ? ((lp - lb) / df) : 0;
    lev.lo = lo;
    return this
  }
  into(val) {
    if (isNaN(val)) return this.nan
    // return pres.proj(lev, lev.lo ?? 0, val)
    const df = val - (this.lev.lo ?? 0);
    const [ hlv, slv, llv ] = this.lev;
    return modHsiTo(this.pres.min, df * hlv, df * slv, df * llv)
  }
  render(val, text) {
    return render.call(this, this.into(val), text)
  }
}

class SignedProj {
  /** @type {Proj} */ pos
  /** @type {Proj} */ neg
  constructor(posPr, negPr) {
    this.pos = new Proj(posPr);
    this.neg = new Proj(negPr);
  }
  load(posBd, negBd) {
    this.pos.load(posBd);
    this.neg.load(negBd);
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

export { Proj, SignedProj };
