import * as math                from '@aryth/math'
import { round }                from '@aryth/math'
import { distance as d, Polar } from '@aryth/polar'
import { hf }                   from '@palett/convert'
import { entriesMinBy }         from '../../utils/minBy'
import { Cuvette }              from '../Cuvette'
import { Domain }               from './Domain'
import { RGB }                  from './RGB'

const { abs } = Math

export class HSL extends Array {
  constructor(h, s, l) {
    super(h, s, l)
  }
  static from([ h, s, l ]) { return new HSL(h, s, l) }

  get h() { return this[0] }
  get s() { return this[1] }
  get l() { return this[2] }
  set h(v) { this[0] = v }
  set s(v) { this[1] = v }
  set l(v) { this[2] = v }

  get theta() { return this[0] }
  get radius() { return this[2] }

  /** @returns {RGB} */
  toRgb() {
    let h = this.h
    let s = this.s / 100
    let l = this.l / 100
    const
      a = s * Math.min(l, 1 - l),
      r = hf(0, h, a, l),
      g = hf(8, h, a, l),
      b = hf(4, h, a, l)
    return new RGB(round(r * 0xFF), round(g * 0xFF), round(b * 0xFF)) // return [r * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
  }

  toPolar() { return new Polar(this.l, this.h) }

  // 
  relative(another) {
    const [ h, s, l ] = another
    return [ d(this.h, h), abs(this.s - s), abs(this.l - l) ]
  }

// float
  distance(another) {
    // console.log('another', another)
    const [ h, s, l ] = this.relative(another)
    return h + s + l
  }

// bool
  almostEqual(another, epsilon) {
    const [ h, s, l ] = another
    return d(this.h, h) < epsilon.h && abs(this.s - s) < epsilon.s && abs(this.l - l) < epsilon.l
  }

  /**
   *
   * @param {Polar} polar
   * @param {Polar} epsilon
   * @param {{min:number,max:number}} saturationInterval
   * @return {boolean}
   */
  almostEqualByPolar(polar, epsilon, saturationInterval) {
    return math.almostEqual(this.h, polar.θ, epsilon.θ) &&
      saturationInterval.min <= this.s && this.s <= saturationInterval.max &&
      math.almostEqual(this.l, polar.r, epsilon.r)
  }

  comparative(epsilon = 0.1, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    let target = "", min = 1024
    for (let [ hex, hsl ] of cuvette.hexToHsl) {
      const distance = this.distance(hsl)
      if (distance < epsilon) return [ hex, cuvette.name(hex) ]
      if (distance < min) { target = hex, min = distance }
    }
    return [ target, cuvette.name(target) ]
  }

  nearest(domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    // console.log('cuvette.hexToHsl', cuvette.hexToHsl.length, decoMatrix(cuvette.hexToHsl, { top: 5, bottom: 2 }))
    let [ hex, _ ] = entriesMinBy(cuvette.hexToHsl, ([ _, hsl ]) => this.distance(hsl))
    return [ hex, cuvette.name(hex) ]
  }

  // list<(string hex, string name)>
  approximates(epsilon, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const distances = cuvette.hexToHsl.filter(([ _, hsl ]) => this.almostEqual(hsl, epsilon))
    return distances.map(([ hex, ]) => [ hex, cuvette.name(hex) ])
  }


// list<(string hex, string name)>
  approximatesByTop(top, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const distances = cuvette.hexToHsl.map(([ hex, hsl ]) => [ hex, this.distance(hsl) ])
    distances.sort(([ , dA ], [ , dB ]) => dA >= dB ? 1 : -1)
    return distances
      .slice(0, top)
      .map(([ hex, ]) => [ hex, cuvette.name(hex) ])
  }

  // liu haitao
  // feng zhiwei
  // list<(string hex, string name)>
  analogous(delta, count, domain = Domain.fashion) {
    const cuvette = Cuvette.selectCuvette(domain)
    const [ , s, ] = this
    const analogous = this.toPolar()
      .analogous(delta, count)
      .map(polar => cuvette.comparativeByPolar(polar, s))
    return analogous
    // return distinct.call({ y: 0 }, analogous)
  }
}