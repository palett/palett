import { E3, round }    from '@aryth/math'
import { bd, hue }      from '@palett/convert'
import { entriesMinBy } from '../../utils/minBy'
import { Cuvette }      from '../Cuvette'
import { Domain }       from './Domain'
import { HSL }          from './HSL'

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
  /** @returns {HSL} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */
  toHsl() {
    const r = this.r / 255,
          g = this.g / 255,
          b = this.b / 255
    const { max, sum, dif } = bd(r, g, b)
    const h = hue(r, g, b, max, dif) * 60,
          s = !dif ? 0 : sum > 1 ? dif / (2 - sum) : dif / sum,
          l = sum / 2
    return new HSL(round(h), round(s * E3) / 10, round(l * E3) / 10)
  }

  relative(another) { return new RGB(abs(this.r - another.r), abs(this.g - another.g), abs(this.b - another.b)) }

  distance(another) {
    const [ r, g, b ] = this.relative(another)
    return r + g + b
  }

  almostEqual(another, epsilon) { return abs(this.r - another.r) < epsilon.r && abs(this.g - another.g) < epsilon.g && abs(this.b - another.b) < epsilon.b }

  comparative(epsilon = 0.1, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    let target = "", min = 1024
    for (let [ hex, rgb ] of cuvette.hexToRgb) {
      const distance = this.distance(rgb)
      if (distance < epsilon) return [ hex, cuvette.name(hex) ]
      if (distance < min) { target = hex, min = distance }
    }
    return [ target, cuvette.name(target) ]
  }
  nearest(domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    let [ hex, _ ] = entriesMinBy(cuvette.hexToRgb, ([ _, hsl ]) => this.distance(hsl))
    return [ hex, cuvette.name(hex) ]
  }

  // list<(string hex, string name)>
  approximates(epsilon, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const distances = cuvette
      .hexToRgb
      .filter(([ , rgb ]) => this.almostEqual(rgb, epsilon))
    return distances.map(([ hex, ]) => [ hex, cuvette.name(hex) ])
  }

// list<(string hex, string name)>
  approximatesByTop(top, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    // list<(string hex, int len)>
    const distances = cuvette
      .hexToRgb
      .map(([ hex, _rgb ]) => [ hex, this.distance(_rgb) ])
    distances.sort(([ , dA ], [ , dB ]) => dA - dB)
    return distances
      .slice(0, top)
      .map(([ hex, ]) => [ hex, cuvette.name(hex) ])
  }
}