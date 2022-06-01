import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl, rgbToInt } from '@palett/convert'
import { HSL }                                              from './HSL'
import { abs }                                              from '../utils/math'

export class RGB extends Array {
  constructor(r, g, b) { super(r, g, b) }
  static of(r, g, b) { return new RGB(r, g, b) }
  static from(rgb) { return new RGB(rgb[0], rgb[1], rgb[2]) }
  static fromHex(hex) { return hexToRgb.call(RGB, hex) }
  static fromHsl(hsl) { return hslToRgb.call(RGB, hsl) }
  static fromInt(n) { new RGB(n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF) }

  get r() { return this[0] }
  get g() { return this[1] }
  get b() { return this[2] }
  set r(v) { this[0] = v }
  set g(v) { this[1] = v }
  set b(v) { this[2] = v }

  get hsl() { return rgbToHsl.call(HSL, this) }
  get int() { return rgbToInt(this) }
  get hex() { return rgbToHex(this) }

  relative(rgb) { return new RGB(abs(this.r - rgb.r), abs(this.g - rgb.g), abs(this.b - rgb.b)) }
  distance(rgb) { return rgb = this.relative(rgb), (rgb[0] + rgb[1] + rgb[2]) }
  almostEqual(rgb, eps) { return abs(this.r - rgb.r) < eps.r && abs(this.g - rgb.g) < eps.g && abs(this.b - rgb.b) < eps.b }
}