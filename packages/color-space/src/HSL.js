import { almostEqual, limitAboveZero, restrictAboveZero, round } from '@aryth/math'
import { distance as d, Polar }                                  from '@aryth/polar'
import { hf }                                                    from '@palett/convert'
import { RGB }                                                   from './RGB'

const { abs } = Math

export class HSL extends Array {
  constructor(h, s, l) {
    super(h, s, l)
  }
  static from([h, s, l]) { return new HSL(h, s, l) }
  static fromPolar(polar, s) { return new HSL(polar.th, s, polar.r) }
  static build(h, s, l) { return new HSL(h, s, l) }

  get h() { return this[0] }
  get s() { return this[1] }
  get l() { return this[2] }
  set h(v) { this[0] = v }
  set s(v) { this[1] = v }
  set l(v) { this[2] = v }

  get theta() { return this[0] }
  get radius() { return this[2] }

  /** @returns {RGB} */
  toRgb() {
    let h = this.h, s = this.s / 100, l = this.l / 100
    const a = s * Math.min(l, 1 - l), r = hf(0, h, a, l), g = hf(8, h, a, l), b = hf(4, h, a, l)
    return new RGB(round(r * 0xFF), round(g * 0xFF), round(b * 0xFF))
  }

  toPolar() { return new Polar(this.l, this.h) }

  // 
  relative(another) {
    const [h, s, l] = another
    return new HSL(d(this.h, h), abs(this.s - s), abs(this.l - l))
  }

  mutate(fn) {
    this.h = fn(this.h)
    this.s = fn(this.s)
    this.l = fn(this.l)
    return this
  }

  restrict() {
    this.h = restrictAboveZero(this.h, 360)
    this.s = limitAboveZero(this.s, 100)
    this.l = limitAboveZero(this.l, 100)
    return this
  }

  distance(another) {
    // console.log('another', another)
    const [h, s, l] = this.relative(another)
    return h + s + l
  }

  almostEqual(another, epsilon) {
    const [h, s, l] = another
    return d(this.h, h) < epsilon.h && abs(this.s - s) < epsilon.s && abs(this.l - l) < epsilon.l
  }

  /**
   *
   * @param {Polar} polar
   * @param {Polar} epsilon
   * @param {{min:number,max:number}} saturationInterval
   * @return {boolean}
   */
  almostEqualByPolar(polar, epsilon, saturationInterval) {
    return almostEqual(this.h, polar.θ, epsilon.θ) &&
      saturationInterval.min <= this.s && this.s <= saturationInterval.max &&
      almostEqual(this.l, polar.r, epsilon.r)
  }
}