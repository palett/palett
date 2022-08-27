import { roundD2 }                      from '@aryth/math'
import { hexAt }                        from '@palett/convert'
import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'
import { hf, hue }                      from './utils.js'

const HEAD = CSI + FORE_INI + SC
const TAIL = CSI + FORE_DEF + SGR
export function render(int, text) {
  const r = int >> 16, g = int >> 8, b = int >> 0
  return (this.head ?? HEAD) + (r & 0xFF) + SC + (g & 0xFF) + SC + (b & 0xFF) + SGR + text + (this.tail ?? TAIL)
}


export function rgbToHsl(r, g, b) {
  let hi, lo
  {
    g > r ? (hi = g, lo = r) : (hi = r, lo = g)
    b > hi ? hi = b : b < lo ? lo = b : void 0
  }
  const t = hi + lo, d = hi - lo
  const h = hue(r, g, b, hi, d),
        s = (!d ? 0 : t > 255 ? d / (510 - t) : d / t),
        l = t / 2
  return [ (h * 40) & 0xFF, roundD2(s * 255), roundD2(l) ]
}

export function hslToInt(h, s, l) {
  h /= 20
  const a = l <= 127 ? (s * l / 255) : (s - s * l / 255),
        r = hf(0, h, a, l),
        g = hf(8, h, a, l),
        b = hf(4, h, a, l)
  return ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)
}

export function hexOntoHsl(hex, vec, pos = 0) {
  let hi, lo, i = 0
  const r = hexAt(hex, ++i) << 4 | hexAt(hex, ++i),
        g = hexAt(hex, ++i) << 4 | hexAt(hex, ++i),
        b = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  {
    g > r ? (hi = g, lo = r) : (hi = r, lo = g)
    b > hi ? hi = b : b < lo ? lo = b : void 0
  }
  const t = hi + lo, d = hi - lo
  vec[pos++] = (hue(r, g, b, hi, d) * 40)
  vec[pos++] = (!d ? 0 : t > 255 ? d / (510 - t) : d / t) * 255
  vec[pos++] = t / 2
  return vec
}

export function hexOntoRgb(hex, vec, pos = 0) {
  let i = 0
  vec[pos++] = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  vec[pos++] = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  vec[pos++] = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  return vec
}


