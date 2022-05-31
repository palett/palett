import { E3, round }             from '@aryth/math'
import { bd, hexToInt, hf, hue } from '@palett/convert'
import { HSL }                   from './HSL'

const { abs } = Math

export class RGB extends Array {
  constructor(r, g, b) {
    super(r, g, b)
  }
  get r() { return this[0] }
  get g() { return this[1] }
  get b() { return this[2] }
  set r(v) { this[0] = v }
  set g(v) { this[1] = v }
  set b(v) { this[2] = v }

  static build(r, g, b) { return new RGB(r, g, b) }
  static from([r, g, b]) { return new RGB(r, g, b) }
  static fromHex(hex) { return (hex = hexToInt(hex), new RGB(hex >> 16 & 0xFF, hex >> 8 & 0xFF, hex & 0xFF)) }
  static fromHsl([h, s, l]) {
    s /= 100, l /= 100
    const a = s * Math.min(l, 1 - l), r = hf(0, h, a, l), g = hf(8, h, a, l), b = hf(4, h, a, l)
    return new RGB(round(r * 0xFF), round(g * 0xFF), round(b * 0xFF))
  }
  static fromInt(n) { new RGB(n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF) }

  /** @returns {HSL} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */
  toHsl() {
    const r = this.r / 255, g = this.g / 255, b = this.b / 255
    const { max, sum, dif } = bd(r, g, b)
    const h = hue(r, g, b, max, dif) * 60, s = !dif ? 0 : sum > 1 ? dif / (2 - sum) : dif / sum, l = sum / 2
    return new HSL(round(h), round(s * E3) / 10, round(l * E3) / 10)
  }

  relative(another) { return new RGB(abs(this.r - another.r), abs(this.g - another.g), abs(this.b - another.b)) }

  distance(another) {
    const [r, g, b] = this.relative(another)
    return r + g + b
  }

  almostEqual(rgb2, epsilon) { return abs(this.r - rgb2.r) < epsilon.r && abs(this.g - rgb2.g) < epsilon.g && abs(this.b - rgb2.b) < epsilon.b }
}