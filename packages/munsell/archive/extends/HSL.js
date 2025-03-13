import { HSL as RawHSL }      from '@palett/color-space'
import { hexToHsl, rgbToHsl } from '@palett/convert'
import { minEntry } from '../../utils/minBy.js'
import { Cova }     from '../Cova.js'

export class HSL extends RawHSL {
  constructor(h, s, l) { super(h, s, l) }
  static of(h, s, l) { return new HSL(h, s, l) }
  static from([ h, s, l ]) { return new HSL(h, s, l) }
  static fromHex(rgb) { return hexToHsl.call(HSL, rgb) }
  static fromRgb(rgb) { return rgbToHsl.call(HSL, rgb) }
  static fromPolar(polar, s) { return new HSL(polar.th, s, polar.r) }

  toRgb() { return super.rgb }
  toPolar() { return super.polar }

  comparative(epsilon = 0.1) {
    let target = '', min = 1024
    for (let [ hex, hsl ] of Cova.hexToHsl) {
      const distance = this.distance(hsl)
      if (distance < epsilon) return [ hex, Cova.name(hex) ]
      if (distance < min) { target = hex, min = distance }
    }
    return [ target, Cova.name(target) ]
  }

  nearest() {
    // console.log('cuvette.hexToHsl', cuvette.hexToHsl.length, decoMatrix(cuvette.hexToHsl, { top: 5, bottom: 2 }))
    let [ hex, _ ] = minEntry(Cova.hexToHsl, ([ _, hsl ]) => this.distance(hsl))
    return [ hex, Cova.name(hex) ]
  }

  // entries<(string hex, string name)>
  approximates(epsilon) {
    const distances = Cova.hexToHsl.filter(([ _, hsl ]) => this.almostEqual(hsl, epsilon))
    return distances.map(([ hex ]) => [ hex, Cova.name(hex) ])
  }

// entries<(string hex, string name)>
  approximatesByTop(top) {
    const distances = Cova.hexToHsl.map(([ hex, hsl ]) => [ hex, this.distance(hsl) ])
    distances.sort(([ , dA ], [ , dB ]) => dA >= dB ? 1 : -1)
    return distances
      .slice(0, top)
      .map(([ hex ]) => [ hex, Cova.name(hex) ])
  }

  // entries<(string hex, string name)>
  analogous(delta, count) {
    const [ , s ] = this
    return this.toPolar()
      .analogous(delta, count)
      .map(polar => Cova.comparativeByPolar(polar, s))
  }
}