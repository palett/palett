import { E2, round }         from '@aryth/math'
import { hexToInt, hf, hue } from '@palett/convert'

export function hslToInt(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l),
        r = hf(0, h, a, l),
        g = hf(8, h, a, l),
        b = hf(4, h, a, l)
  return ((round(r * 0xFF) & 0xFF) << 16) + ((round(g * 0xFF) & 0xFF) << 8) + (round(b * 0xFF) & 0xFF)
}
export function rgbToHuv(r, g, b) {
  r /= 255, g /= 255, b /= 255
  let hi = r, lo = r
  {
    if (g > r) { hi = g }
    else { lo = g }
    if (b > hi) hi = b
    if (b < lo) lo = b
  }
  const t = hi + lo, d = hi - lo
  const h = hue(r, g, b, hi, d) * 60,
        s = !d ? 0 : t > 1 ? d / (2 - t) : d / t,
        l = t / 2
  return ((h & 0x1FF) << 14) + (((s * E2) & 0x7F) << 7) + (((l * E2) & 0x7F) << 0)
}

export function hexToHuv(hex) {
  const n = hexToInt(hex)
  const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n >> 0 & 0xFF
  return rgbToHuv(r, g, b)
}