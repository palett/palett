import { almostEqual }                            from '@aryth/math'
import { distance as d, Polar }                   from '@aryth/polar'
import { hexToHsl, hslToHex, hslToRgb, rgbToHsl } from '@palett/convert'
import { abs }                                    from '../utils/math.js'
import { RGB }                                    from './RGB.js'

export class HSL {
  h
  s
  l
  constructor(h, s, l) {
    this.h = h
    this.s = s
    this.l = l
  }
  static of(h, s, l) { return new HSL(h, s, l) }
  static from([ h, s, l ]) { return new HSL(h, s, l) }
  static fromHex(rgb) { return hexToHsl.call(HSL, rgb)}
  static fromRgb(rgb) { return rgbToHsl.call(HSL, rgb) }
  static fromPolar(polar, s) { return new HSL(polar.th, s, polar.r) }

  get theta() { return this.h }
  get radius() { return this.l }

  get rgb() { return hslToRgb.call(RGB, this) }
  get hex() { return hslToHex(this) }
  get polar() { return new Polar(this.l, this.h) }

  * [Symbol.iterator]() {
    yield this.h
    yield this.s
    yield this.l
  }

  mutate(fn) {
    this.h = fn(this.h), this.s = fn(this.s), this.l = fn(this.l)
    return this
  }
  relative(hsl) {
    const [ h, s, l ] = hsl
    return new HSL(d(this.h, h), abs(this.s - s), abs(this.l - l))
  }
  restrict() {
    // this.h = rec0up(this.h, 360)
    // this.s = lim0up(this.s, 100)
    // this.l = lim0up(this.l, 100)
    let h = this.h
    this.h = (h %= 360) < 0 ? h + 360 : h
    this.s = this.s < 0 ? 0 : this.s > 100 ? 100 : this.s
    this.l = this.l < 0 ? 0 : this.l > 100 ? 100 : this.l
    return this
  }
  distance(hsl) { return hsl = this.relative(hsl), (hsl.h + hsl.s + hsl.l) }
  almostEqual(hsl, eps) {
    return d(this.h, hsl.h) < eps.h && abs(this.s - hsl.s) < eps.s && abs(this.l - hsl.l) < eps.l
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