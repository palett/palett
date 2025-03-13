import { Polar }    from '@aryth/polar'
import { FASHIONS } from './Pavtone.Fashions.js'
import { distance } from '../utils/hsl.util.js'
import { minEntry } from '../utils/minBy.js'
import { HSL }      from './extends/HSL.js'
import { RGB }      from './extends/RGB.js'

export class Cova {
  static #raw = FASHIONS // object<hex,name>
  static #entries = null // [hex, name][]
  static #rgbs = null // [hex, rgb][]
  static #hsls = null // [hex, hsl][]
  static #polars = null // [hex, polar][]

  static name(key) { return Cova.#raw[key] }

  // entries<(string key, string val)>
  /** @return {[string, string][]} */
  static get entries() {
    return Cova.#entries ?? (Cova.#entries = Object.entries(Cova.#raw))
  }

  // entries<(string hex, (byte r, byte g, byte b) rgb)>
  /** @return {[string, RGB][]} */
  static get hexToRgb() {
    return Cova.#rgbs ?? (Cova.#rgbs = Object.keys(Cova.#raw).map(hex => [ hex, RGB.fromHex(hex) ])) // Cova.#raw.map(kv => [ kv.key, hexToRgb(kv.key) ]
  }

  // entries<(string hex, (float h, float s, float l) hsl)>
  /** @return {[string, HSL][]} */
  static get hexToHsl() {
    return Cova.#hsls ?? (Cova.#hsls = Object.keys(Cova.#raw).map(hex => [ hex, HSL.fromHex(hex) ]))
  }

  // entries<(string hex, (double r, double θ) polar)>
  /** @return {[string, Polar][]} */
  static get hexToPolar() {
    return Cova.#polars ?? (Cova.#polars = Cova.hexToHsl.map(([ hex, hsl ]) => [ hex, hsl.toPolar() ]))
  }

  // entries<(string hex, string name)>
  static search(name) { return Cova.entries.filter(([ , label ]) => label.includes(name)) }

  static segment(hRange, sRange, lRange) {
    const { min, max } = hRange
    if (hRange.min < hRange.max) { return Cova.hexToHsl.filter(([ _, hsl ]) => min <= hsl.h && hsl.h <= max) }
    if (hRange.min > hRange.max) { return Cova.hexToHsl.filter(([ _, hsl ]) => min <= hsl.h && hsl.h <= max) }
  }

  // (string hex, string name)
  static comparativeByHsl(hsl) {
    let [ hex, _ ] = minEntry(Cova.hexToHsl, ([ , hsl2 ]) => distance(hsl, hsl2))
    return [ hex, Cova.name(hex) ]
  }

  // (string hex, string name)
  static comparativeByPolar(polar, s) {
    const major = HSL.fromPolar(polar, s)
    let [ hex, _ ] = minEntry(Cova.hexToHsl, ([ , hsl ]) => major.distance(hsl))
    return [ hex, Cova.name(hex) ]
  }
}






