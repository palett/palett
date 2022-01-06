export class Cuvette {
  // dictionary<string, string>
  dict

  // list<(string key, string val)>
  #entries = null

  // list<hex_rgb>
  #dictRgb = null

  // list<hex_hsl>
  #dictHsl = null

  // list<hex_polar>
  #dictPolar = null

  constructor(dict) {
    this.dict = dict
  }

  // dictionary<string, string>
  static build(raw) {
    return new Cuvette(raw)
  };

  index(key) { return this.dict[key] }

  // list<(string key, string val)>
  get list() {
    return this.#entries?.length
      ? this.#entries
      : this.#entries = this.dict.select(kv => (kv.key, kv.value))
  }

  // list<(string hex, (byte r, byte g, byte b) rgb)>
  get hexToRgb() {
    return this.#dictRgb?.length
      ? this.#dictRgb
      : this.#dictRgb = this.dict.map(kv => (kv.key, conv.hexToRgb(kv.key)))
  }

  // list<(string hex, (float h, float s, float l) hsl)>
  get hexToHsl() {
    return this.#dictHsl?.length
      ? this.#dictHsl
      : this.#dictHsl = this.hexToRgb.map(kv => (kv.hex, kv.rgb.rgbToHsl()))
  }

  // list<(string hex, (double r, double θ) polar)>
  get hexToPolar() {
    return this.#dictPolar?.length
      ? this.#dictPolar
      : this.#dictPolar = this.hexToHsl.map(kv => (kv.hex, kv.hsl.c()))
  }

  // (string hex, string name)
  comparativeByHsl(hsl) {
    let [ hex, _ ] = this.hexToHsl.minBy(kv => hsl.distance(kv.hsl))
    return (hex, this[hex])
  }

  // (string hex, string name)
  comparativeByPolar(polar, s) {
    const hsl = polar.polarToHsl(s)
    let [ hex, _ ] = this.hexToHsl.minBy(kv => hsl.distance(kv.hsl))
    return (hex, this[hex])
  }
}


export class Munsell {
  static  _fashion = null
  static  _product = null
  static selectCuvette(domain) {
    switch (domain) {
      case domain.fashion:
        return Munsell._fashion ?? (Munsell._fashion = Cuvette.build(domain.fashion.toPalett()))
      case domain.product:
        return Munsell._product ?? (Munsell._product = Cuvette.build(domain.product.toPalett()))
      default:
        return new Cuvette()
    }
  }
}

