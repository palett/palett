import { RGB as RawRGB }      from '@palett/color-space'
import { hexToRgb, hslToRgb } from '@palett/convert'
import { minEntry }           from '../../utils/minBy.js'
import { Cova }               from '../Cova.js'
import { Domain }             from '../Domain.js'

export class RGB extends RawRGB {
  constructor(r, g, b) { super(r, g, b) }
  static of(r, g, b) { return new RGB(r, g, b) }
  static from([ r, g, b ]) { return new RGB(r, g, b) }
  static fromHex(hex) { return hexToRgb.call(RGB, hex) }
  static fromHsl(hsl) { return hslToRgb.call(RGB, hsl) }

  /** @returns {HSL} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */
  toHsl() { return super.hsl }

  comparative(epsilon = 0.1, domain = Domain.fashion) {
    const cuvette = Cova.select(domain)
    let target = '', min = 1024
    for (let [ hex, rgb ] of cuvette.hexToRgb) {
      const distance = this.distance(rgb)
      if (distance < epsilon) return [ hex, cuvette.name(hex) ]
      if (distance < min) { target = hex, min = distance }
    }
    return [ target, cuvette.name(target) ]
  }
  nearest(domain = Domain.fashion) {
    const cuvette = Cova.select(domain)
    let [ hex, _ ] = minEntry(cuvette.hexToRgb, ([ _, hsl ]) => this.distance(hsl))
    return [ hex, cuvette.name(hex) ]
  }

  // entries<(string hex, string name)>
  approximates(epsilon, domain = Domain.fashion) {
    const cuvette = Cova.select(domain)
    const distances = cuvette
      .hexToRgb
      .filter(([ , rgb ]) => this.almostEqual(rgb, epsilon))
    return distances.map(([ hex ]) => [ hex, cuvette.name(hex) ])
  }

// entries<(string hex, string name)>
  approximatesByTop(top, domain = Domain.fashion) {
    const cuvette = Cova.select(domain)
    // entries<(string hex, int len)>
    const distances = cuvette
      .hexToRgb
      .map(([ hex, _rgb ]) => [ hex, this.distance(_rgb) ])
    distances.sort(([ , dA ], [ , dB ]) => dA - dB)
    return distances
      .slice(0, top)
      .map(([ hex ]) => [ hex, cuvette.name(hex) ])
  }
}