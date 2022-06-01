import { FASHIONS } from '../resources/Pavtone.Fashions'
import { PRODUCTS } from '../resources/Pavtone.Products'
import { distance } from '../utils/hsl.util'
import { entMin }   from '../utils/minBy'
import { Domain }   from './Domain'
import { HSL }      from './HSL'
import { RGB }      from './RGB'

export class Cuvette {
  dict // dictionary<string, string>
  #ents = null // list<(string key, string val)>
  #rgbEnts = null // list<hex_rgb>
  #hslEnts = null // list<hex_hsl>
  #polEnts = null // list<hex_polar>
  static #fashion = null
  static #product = null

  constructor(dict) {
    this.dict = dict
  }

  // dictionary<string, string>
  static build(raw) {
    return new Cuvette(raw)
  }

  static selectCuvette(domain) {
    if (domain === Domain.fashion) return Cuvette.#fashion ?? (Cuvette.#fashion = Cuvette.build(FASHIONS))
    if (domain === Domain.product) return Cuvette.#product ?? (Cuvette.#product = Cuvette.build(PRODUCTS))
    return new Cuvette()
  }

  name(key) { return this.dict[key] }

  // list<(string key, string val)>
  /** @return {[string, string][]} */
  get list() { return this.#ents?.length ? this.#ents : (this.#ents = Object.entries(this.dict)) }

  // list<(string hex, (byte r, byte g, byte b) rgb)>
  /** @return {[string, RGB][]} */
  get hexToRgb() {
    return this.#rgbEnts?.length
      ? this.#rgbEnts
      : this.#rgbEnts = Object.keys(this.dict).map(key => [key, RGB.fromHex(key)]) // this.dict.map(kv => [ kv.key, hexToRgb(kv.key) ]
  }

  // list<(string hex, (float h, float s, float l) hsl)>
  /** @return {[string, HSL][]} */
  get hexToHsl() {
    return this.#hslEnts?.length
      ? this.#hslEnts
      : this.#hslEnts = this.hexToRgb.map(([hex, rgb]) => [hex, rgb.toHsl()])
  }

  // list<(string hex, (double r, double θ) polar)>
  /** @return {[string, Polar][]} */
  get hexToPolar() {
    return this.#polEnts?.length
      ? this.#polEnts
      : this.#polEnts = this.hexToHsl.map(([hex, hsl]) => [hex, hsl.toPolar()])
  }

  // list<(string hex, string name)>
  search(name) {
    return this.list.filter(([, currName]) => currName.includes(name))
  }

  segment(hRange, sRange, lRange) {
    const { min, max } = hRange
    if (hRange.min < hRange.max) { return this.hexToHsl.filter(([_, hsl]) => min <= hsl.h && hsl.h <= max) }
    if (hRange.min > hRange.max) { return this.hexToHsl.filter(([_, hsl]) => min <= hsl.h && hsl.h <= max) }
  }

  // (string hex, string name)
  comparativeByHsl(hsl) {
    let [hex, _] = entMin(this.hexToHsl, ([, hsl2]) => distance(hsl, hsl2))
    return [hex, this.name(hex)]
  }

  // (string hex, string name)
  comparativeByPolar(polar, s) {
    const major = HSL.fromPolar(polar, s)
    let [hex, _] = entMin(this.hexToHsl, ([, hsl]) => major.distance(hsl))
    return [hex, this.name(hex)]
  }
}






