import { minus }    from '@aryth/polar'
import { hsaToRgi } from './rgi.js'
import { hue }      from './util/number-utils.js'
import { ff }       from './util/string-utils.js'

export function hexToHsi(hex) {
  const r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5)
  return rgaToHsi(r, g, b)
}

export function rgaToHsi(r, g, b) {
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  let tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 60, // original h ∈ [0,6), then h = h * 60, makes h ∈ [0,360)
    s = !df ? 0 : (df * 200) / (tt > 255 ? (510 - tt) : tt), // s ∈ [0,512)
    l = (tt * 200) / 510
  h = ~~(h + 0.5), s = ~~(s + 0.5), l = ~~(l + 0.5)
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // h ∈ [0, 360), s ∈ [0, 512), l ∈ [0, 512)
}

export function modHsi(int, dh, ds, dl) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h += dh, s += ds, l += dl
  if ((h %= 360) < 0) h += 360
  if (s < 0) { s = 0 } else if (s > 200) { s = 200 }
  if (l < 0) { l = 0 } else if (l > 200) { l = 200 }
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // 9 bit + 9 bit + 9 bit = 25 bit
}

export function modHsiTo(int, dh, ds, dl) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h += dh, s += ds, l += dl
  if ((h %= 360) < 0) h += 360
  if (s < 0) { s = 0 } else if (s > 200) { s = 200 }
  if (l < 0) { l = 0 } else if (l > 200) { l = 200 }
  return hsaToRgi(h, s, l)
}

export function deltaHsi(min, max) {
  return [ minus(max >> 16 & 0x1FF, min >> 16 & 0x1FF), (max >> 8 & 0xFF) - (min >> 8 & 0xFF), (max & 0xFF) - (min & 0xFF) ]
}

export function modRgi(int, dh, ds, dl) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  r += dh, g += ds, b += dl
  r = r < 0 ? 0 : r > 0xFF ? 0xFF : r
  g = g < 0 ? 0 : g > 0xFF ? 0xFF : g
  b = b < 0 ? 0 : b > 0xFF ? 0xFF : b
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF // 9 bit + 9 bit + 9 bit = 25 bit
}