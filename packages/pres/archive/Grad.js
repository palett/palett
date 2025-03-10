import { Pres }    from '@palett/pres'
import { value }   from '@texting/string-value'
import { compare } from '../utils/compare.js'

function onto(x, y, z, at) {
  this[at++] = x
  this[at++] = y
  this[at++] = z
  return this
}

export class Grad {
  /** @type {boolean} unsigned mode: ignore pos/neg diff */ u
  /** @type {number} min string value                    */ s
  /** @type {number} max string value                    */ t
  /** @type {number} min (negative) number value         */ m
  /** @type {number} max (negative) number value         */ n
  /** @type {number} min positive number value           */ p
  /** @type {number} max positive number value           */ q
  /** @type {number} width parameter used in value calculations */ w
  constructor(uns) { this.u = uns }
  static build(uns) {
    const vec = Array(9)
    vec.u = !!uns
    return vec
  }
  /**
   * @param {{str:Pres, neg:Pres, pos:Pres}} pres preset(s) to render string, negative and positive number values
   * @param {number} width width of string format of the value referenced
   * @returns {Grad}
   */
  lever(pres, width) {
    this.w = width
    if (pres.str && this.sx !== void 0) {
      this.s = value(this.sx, width), this.t = value(this.tx, width)
      const df = this.t - this.s, [ hb, sb, lb, hp, sp, lp ] = pres.str
      df ? onto.call(this, (hp - hb) / df, (sp - sb) / df, (lp - lb) / df, 0) : onto.call(this, 0, 0, 0, 0)
    }
    if (pres.neg && this.m !== void 0) {
      const df = this.n - this.m, [ hb, sb, lb, hp, sp, lp ] = pres.neg
      df ? onto.call(this, (hp - hb) / df, (sp - sb) / df, (lp - lb) / df, 3) : onto.call(this, 0, 0, 0, 3)
    }
    if (pres.pos && this.p !== void 0) {
      const df = this.q - this.p, [ hb, sb, lb, hp, sp, lp ] = pres.pos
      df ? onto.call(this, (hp - hb) / df, (sp - sb) / df, (lp - lb) / df, 6) : onto.call(this, 0, 0, 0, 6)
    }
    return this
  }
  noteStr(t) {
    return this.tx === void 0
      ? (this.tx = t, this.sx = t)
      : compare(t, this.sx) < 0 ? (this.sx = t) : compare(t, this.tx) > 0 ? (this.tx = t) : t
  }
  noteNum(v) {
    if (this.u) {
      return this.n === void 0
        ? (this.n = v, this.m = v)
        : v < this.m ? (this.m = v) : v > this.n ? (this.n = v) : v
    } else {
      if (v > 0) return this.p === void 0
        ? (this.p = this.q = v)
        : v < this.p ? (this.p = v) : v > this.q ? (this.q = v) : v
      if (v < 0) return this.m === void 0
        ? (this.m = this.n = v)
        : v < this.m ? (this.m = v) : v > this.n ? (this.n = v) : v
      return v
    }
  }
}
