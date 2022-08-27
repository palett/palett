import { Proj } from './Proj.js'

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