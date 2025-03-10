import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl, rgbToRgi } from '@palett/convert'
import { HSL }                                              from './HSL.js'
import { abs }                                              from '../utils/math.js'

export class RGB {
  r
  g
  b
  constructor(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }
  static of(r, g, b) { return new RGB(r, g, b) }
  static from(rgb) { return new RGB(rgb[0], rgb[1], rgb[2]) }
  static fromHex(hex) { return hexToRgb.call(RGB, hex) }
  static fromHsl(hsl) { return hslToRgb.call(RGB, hsl) }
  static fromInt(n) { new RGB(n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF) }

  * [Symbol.iterator]() {
    yield this.r
    yield this.g
    yield this.b
  }

  get hsl() { return rgbToHsl.call(HSL, this) }
  get int() { return rgbToRgi(this) }
  get hex() { return rgbToHex(this) }

  relative(rgb) { return new RGB(abs(this.r - rgb.r), abs(this.g - rgb.g), abs(this.b - rgb.b)) }
  distance(rgb) { return rgb = this.relative(rgb), (rgb.r + rgb.g + rgb.b) }
  almostEqual(rgb, eps) { return abs(this.r - rgb.r) < eps.r && abs(this.g - rgb.g) < eps.g && abs(this.b - rgb.b) < eps.b }
}