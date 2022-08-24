import { almostEqual, lim0up, rec0up }            from '@aryth/math'
import { distance as d, Polar }                   from '@aryth/polar'
import { hexToHsl, hslToHex, hslToRgb, rgbToHsl } from '@palett/convert'
import { abs }                                    from '../utils/math'
import { RGB }                                    from './RGB'

export class HSL extends Array {
  constructor(h, s, l) { super(h, s, l) }
  static of(h, s, l) { return new HSL(h, s, l) }
  static from([h, s, l]) { return new HSL(h, s, l) }
  static fromHex(rgb) { return hexToHsl.call(HSL, rgb)}
  static fromRgb(rgb) { return rgbToHsl.call(HSL, rgb)}
  static fromPolar(polar, s) { return new HSL(polar.th, s, polar.r) }

  get h() { return this[0] }
  get s() { return this[1] }
  get l() { return this[2] }
  set h(v) { this[0] = v }
  set s(v) { this[1] = v }
  set l(v) { this[2] = v }

  get theta() { return this[0] }
  get radius() { return this[2] }

  get rgb() { return hslToRgb.call(RGB, this) }
  get hex() { return hslToHex(this) }
  get polar() { return new Polar(this.l, this.h) }

  mutate(fn) {
    this.h = fn(this.h), this.s = fn(this.s), this.l = fn(this.l)
    return this
  }
  relative(hsl) {
    const [h, s, l] = hsl
    return new HSL(d(this.h, h), abs(this.s - s), abs(this.l - l))
  }
  restrict() {
    this.h = rec0up(this.h, 360)
    this.s = lim0up(this.s, 100)
    this.l = lim0up(this.l, 100)
    return this
  }
  distance(hsl) { return hsl = this.relative(hsl), (hsl[0] + hsl[1] + hsl[2]) }
  almostEqual(hsl, eps) {
    const [h, s, l] = hsl
    return d(this.h, h) < eps.h && abs(this.s - s) < eps.s && abs(this.l - l) < eps.l
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