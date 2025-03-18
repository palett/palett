import { hslToRgb, hslToHex, hexToHsl, rgbToHsl, rgbToRgi, rgbToHex, hexToRgb } from '@palett/convert';
import { almostEqual } from '@aryth/math';
import { Polar, distance } from '@aryth/polar';

const { abs } = Math;

class HSL {
  h
  s
  l
  constructor(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }
  get theta() { return this.h }
  get radius() { return this.l }
  get rgb() { return hslToRgb.call(RGB, this) }
  get hex() { return hslToHex(this) }
  get polar() { return new Polar(this.l, this.h) }
  static of(h, s, l) { return new HSL(h, s, l) }
  static from([ h, s, l ]) { return new HSL(h, s, l) }
  static fromHex(rgb) { return hexToHsl.call(HSL, rgb)}
  static fromRgb(rgb) { return rgbToHsl.call(HSL, rgb) }
  static fromPolar(polar, s) { return new HSL(polar.th, s, polar.r) }
  * [Symbol.iterator]() {
    yield this.h;
    yield this.s;
    yield this.l;
  }

  mutate(fn) {
    this.h = fn(this.h), this.s = fn(this.s), this.l = fn(this.l);
    return this
  }
  relative(hsl) {
    const [ h, s, l ] = hsl;
    return new HSL(distance(this.h, h), abs(this.s - s), abs(this.l - l))
  }
  restrict() {
    // this.h = rec0up(this.h, 360)
    // this.s = lim0up(this.s, 100)
    // this.l = lim0up(this.l, 100)
    let h = this.h;
    this.h = (h %= 360) < 0 ? h + 360 : h;
    this.s = this.s < 0 ? 0 : this.s > 100 ? 100 : this.s;
    this.l = this.l < 0 ? 0 : this.l > 100 ? 100 : this.l;
    return this
  }
  distance(hsl) { return hsl = this.relative(hsl), (hsl.h + hsl.s + hsl.l) }
  almostEqual(hsl, eps) {
    return distance(this.h, hsl.h) < eps.h && abs(this.s - hsl.s) < eps.s && abs(this.l - hsl.l) < eps.l
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

class RGB {
  r
  g
  b
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  get hsl() { return rgbToHsl.call(HSL, this) }
  get int() { return rgbToRgi(this) }
  get hex() { return rgbToHex(this) }
  static of(r, g, b) { return new RGB(r, g, b) }
  static from(rgb) { return new RGB(rgb[0], rgb[1], rgb[2]) }
  static fromHex(hex) { return hexToRgb.call(RGB, hex) }
  static fromHsl(hsl) { return hslToRgb.call(RGB, hsl) }
  static fromInt(n) { }
  * [Symbol.iterator]() {
    yield this.r;
    yield this.g;
    yield this.b;
  }
  relative(rgb) { return new RGB(abs(this.r - rgb.r), abs(this.g - rgb.g), abs(this.b - rgb.b)) }
  distance(rgb) { return rgb = this.relative(rgb), (rgb.r + rgb.g + rgb.b) }
  almostEqual(rgb, eps) { return abs(this.r - rgb.r) < eps.r && abs(this.g - rgb.g) < eps.g && abs(this.b - rgb.b) < eps.b }
}

export { HSL, RGB };
