import { almostEqual }  from '@aryth/math'
import { hslToHex }     from '@palett/convert'
import { HSL }          from '@palett/color-space'
import { toUpper }      from '@texting/phrasing'
import { init }         from '@vect/vector-init'
import { draw, HexDye } from '@palett/dye'

function hexToStr(hex) { return draw.call(HexDye.prototype.into.call(this, hex), hex) }

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
  static from(preset, effects) {
    const { min, max, na } = preset
    const target = new Preset(min, max, na)
    if (effects) target.effects = effects
    return target
  }
  static fromHSL(min, max, na) { return new Preset(hslToHex(min), hslToHex(max), hslToHex(na)) }

  reverse() { return Preset.build(this.max, this.min, this.na) }
  range(n) {
    function d(min, max, n) {
      const delta = (max - min) / (n - 1), EP = 0.0008
      return almostEqual(delta, 0, EP) ? 0 : delta
    }
    const [h, s, l]    = HSL.fromHex(this.min),
          max          = HSL.fromHex(this.max),
          [dh, ds, dl] = [d(h, max.h, n), d(s, max.s, n), d(l, max.l, n)]
    return init(n, i => HSL.of(h + i * dh, s + i * ds, l + i * dl).restrict().hex|> toUpper)

  }
  demo(n) { return `[${this.range(n).map(hexToStr).join(' ')}] | [${this.na|> hexToStr}]` }
}