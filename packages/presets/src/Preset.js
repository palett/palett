import { almostEqual }   from '@aryth/math'
import { hslToHex }      from '@palett/convert'
import { hexToHsl, HSL } from '@palett/munsell'
import { hexToStr }      from '@palett/stringify'
import { toUpper }       from '@texting/phrasing'
import { init }          from '@vect/vector-init'

export class Preset {
  max
  min
  na
  constructor(min, max, na) {
    this.min = min
    this.max = max
    this.na = na
  }
  static build(min, max, na = '#CCCCCC') { return new Preset(min, max, na) }
  static fromHSL(min, max, na) { return new Preset(min|> hslToHex, max|> hslToHex, na|> hslToHex) }
  reverse() { return Preset.build(this.max, this.min, this.na) }
  range(n) {
    function d(min, max, n) {
      const delta = (max - min) / (n - 1), EP = 0.0008
      return almostEqual(delta, 0, EP) ? 0 : delta
    }
    const
      x = this.min|> hexToHsl, y = this.max|> hexToHsl,
      [ h, s, l ] = x,
      [ dh, ds, dl ] = [ d(h, y.h, n), d(s, y.s, n), d(l, y.l, n) ]
    return init(n, i => HSL.build(h + i * dh, s + i * ds, l + i * dl).restrict()|> hslToHex|> toUpper)
  }
  demo(n) { return `[${this.range(n).map(hexToStr).join(' ')}] | [${this.na|> hexToStr}]` }
}