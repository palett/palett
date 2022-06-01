import { entMin }             from '../utils/minBy'
import { Cuvette }            from './Cuvette'
import { Domain }             from './Domain'
import { HSL as RawHSL }      from '@palett/color-space'
import { hexToHsl, rgbToHsl } from '@palett/convert'

export class HSL extends RawHSL {
  constructor(h, s, l) { super(h, s, l) }
  static of(h, s, l) { return new HSL(h, s, l) }
  static from([h, s, l]) { return new HSL(h, s, l) }
  static fromHex(rgb) { return hexToHsl.call(HSL, rgb) }
  static fromRgb(rgb) { return rgbToHsl.call(HSL, rgb) }
  static fromPolar(polar, s) { return new HSL(polar.th, s, polar.r) }

  toRgb() { return super.rgb }
  toPolar() { return super.polar }

  comparative(epsilon = 0.1, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    let target = "", min = 1024
    for (let [hex, hsl] of cuvette.hexToHsl) {
      const distance = this.distance(hsl)
      if (distance < epsilon) return [hex, cuvette.name(hex)]
      if (distance < min) { target = hex, min = distance }
    }
    return [target, cuvette.name(target)]
  }

  nearest(domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    // console.log('cuvette.hexToHsl', cuvette.hexToHsl.length, decoMatrix(cuvette.hexToHsl, { top: 5, bottom: 2 }))
    let [hex, _] = entMin(cuvette.hexToHsl, ([_, hsl]) => this.distance(hsl))
    return [hex, cuvette.name(hex)]
  }

  // list<(string hex, string name)>
  approximates(epsilon, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const distances = cuvette.hexToHsl.filter(([_, hsl]) => this.almostEqual(hsl, epsilon))
    return distances.map(([hex,]) => [hex, cuvette.name(hex)])
  }


// list<(string hex, string name)>
  approximatesByTop(top, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const distances = cuvette.hexToHsl.map(([hex, hsl]) => [hex, this.distance(hsl)])
    distances.sort(([, dA], [, dB]) => dA >= dB ? 1 : -1)
    return distances
      .slice(0, top)
      .map(([hex,]) => [hex, cuvette.name(hex)])
  }

  // list<(string hex, string name)>
  analogous(delta, count, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const [, s,] = this
    const analogous = this.toPolar()
      .analogous(delta, count)
      .map(polar => cuvette.comparativeByPolar(polar, s))
    return analogous
    // return distinct.call({ y: 0 }, analogous)
  }
}