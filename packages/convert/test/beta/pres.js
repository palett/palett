import { intToStr } from '@palett/stringify'
import { hexAt }    from '../../utils/hex/index.js'
import { hf, hue }  from './beta.js'

export class Preset extends Uint8ClampedArray {
  head
  tail
  constructor() { super(9) }
  get min() { return this }
  get max() { return this.slice(3, 6) }
  get nan() { return this.slice(7, 9) }
  set min(hsl) { this[0] = hsl[0], this[1] = hsl[1], this[2] = hsl[2] }
  set max(hsl) { this[3] = hsl[0], this[4] = hsl[1], this[5] = hsl[2] }
  set nan(rgb) { this[6] = rgb[0], this[7] = rgb[1], this[8] = rgb[2] }
  set effects(list) {

  }
}
export class UCA {
  static presToUCA({ min, max, na }) {
    const uca = new Preset()
    UCA.hexToHsl(min, uca, 0)
    UCA.hexToHsl(max, uca, 3)
    UCA.hexToRgb(na, uca, 6)
    return uca
  }
  static ucaToPres(uca) {
    const [ ha, sa, la, hb, sb, lb, rc, gc, bc ] = uca
    return {
      min: UCA.hslToInt(ha, sa, la),
      max: UCA.hslToInt(hb, sb, lb),
      nan: rc << 16 | gc << 8 | bc
    }
  }
  static hexToHsl(hex, uca, pos = 0) {
    let hi, lo, i = 0
    const r = hexAt(hex, ++i) << 4 | hexAt(hex, ++i),
          g = hexAt(hex, ++i) << 4 | hexAt(hex, ++i),
          b = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
    {
      g > r ? (hi = g, lo = r) : (hi = r, lo = g)
      b > hi ? hi = b : b < lo ? lo = b : void 0
    }
    const t = hi + lo, d = hi - lo
    uca[pos++] = (hue(r, g, b, hi, d) * 40)
    uca[pos++] = (!d ? 0 : t > 255 ? d / (510 - t) : d / t) * 255
    uca[pos++] = t / 2
    return uca
  }
  static hslToInt(h, s, l) {
    h /= 20
    const a = l <= 127 ? (s * l / 255) : (s - s * l / 255),
          r = hf(0, h, a, l),
          g = hf(8, h, a, l),
          b = hf(4, h, a, l)
    return ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)
  }
  static hexToRgb(hex, uca, pos = 0) {
    let i = 0
    uca[pos++] = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
    uca[pos++] = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
    uca[pos++] = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
    return uca
  }

  static ucaToStr(uca, size = 5) {
    const [ ha, sa, la, hb, sb, lb, rc, gc, bc ] = uca
    const dh = hb - ha, ds = sb - sa, dl = lb - la
    const gp = size - 1
    const hv = dh / gp, sv = ds / gp, lv = dl / gp
    let text = ''
    for (let i = 0; i < gp; i++) {
      text += intToStr(UCA.hslToInt(ha + hv * i, sa + sv * i, la + lv * i)) + ' '
    }
    text += intToStr(UCA.hslToInt(hb, sb, lb))
    return text
  }
}