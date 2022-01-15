import { FASHIONS }     from '../resources/Pavtone.Fashions'
import { PRODUCTS }     from '../resources/Pavtone.Products'
import { polarToHsl }   from '../utils/convert'
import { distance }     from '../utils/hsl.util'
import { entriesMinBy } from '../utils/minBy'
import { hexToRgb }     from './conversion'
import { Domain }       from './types/Domain'

export class Cuvette {
  dict // dictionary<string, string>
  #entries = null // list<(string key, string val)>
  #rgbEntries = null // list<hex_rgb>
  #hslEntries = null // list<hex_hsl>
  #polarEntries = null // list<hex_polar>
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
  get list() {
    return this.#entries?.length
      ? this.#entries
      : (this.#entries = Object.entries(this.dict))
  }

  // list<(string hex, (byte r, byte g, byte b) rgb)>
  /** @return {[string, RGB][]} */
  get hexToRgb() {
    return this.#rgbEntries?.length
      ? this.#rgbEntries
      : this.#rgbEntries = Object.keys(this.dict).map(key => [ key, hexToRgb(key) ]) // this.dict.map(kv => [ kv.key, hexToRgb(kv.key) ]
  }

  // list<(string hex, (float h, float s, float l) hsl)>
  /** @return {[string, HSL][]} */
  get hexToHsl() {
    return this.#hslEntries?.length
      ? this.#hslEntries
      : this.#hslEntries = this.hexToRgb.map(([ hex, rgb ]) => [ hex, rgb.toHsl() ])
  }

  // list<(string hex, (double r, double θ) polar)>
  /** @return {[string, Polar][]} */
  get hexToPolar() {
    return this.#polarEntries?.length
      ? this.#polarEntries
      : this.#polarEntries = this.hexToHsl.map(([ hex, hsl ]) => [ hex, hsl.toPolar() ])
  }

  // list<(string hex, string name)>
  search(name) {
    return this.list.filter(([ , currName ]) => currName.includes(name))
  }

  segment(hRange, sRange, lRange) {
    const { min, max } = hRange
    if (hRange.min < hRange.max) { return this.hexToHsl.filter(([ _, hsl ]) => min <= hsl.h && hsl.h <= max) }
    if (hRange.min > hRange.max) { return this.hexToHsl.filter(([ _, hsl ]) => min <= hsl.h && hsl.h <= max) }
  }

  // (string hex, string name)
  comparativeByHsl(hsl) {
    let [ hex, _ ] = entriesMinBy(this.hexToHsl, kv => distance(hsl, kv[1]))
    return [ hex, this.name(hex) ]
  }

  // (string hex, string name)
  comparativeByPolar(polar, s) {
    const hsl = polarToHsl(polar, s)
    let [ hex, _ ] = entriesMinBy(this.hexToHsl, kv => distance(hsl, kv[1]))
    return [ hex, this.name(hex) ]
  }
}






