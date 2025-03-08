import { ff, hslToInt } from '@palett/convert'
import { hf, hue }      from './color-utils.js'

const PARAM = 85.33333333333333

export function rgbToHsi(r, g, b) {
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  let tt = hi + lo, df = hi - lo
  const h = hue(r, g, b, hi, df) * PARAM // original h ∈ [0,6), then h = h * 60 * 512 / 360, makes h ∈ [0,512)
  const s = !df ? 0 : (df * 255) / (tt > 255 ? (510 - tt) : tt)// s ∈ [0,255)
  const l = (tt / 2)  // l ∈ [0,255)
  console.log(h, s, l)
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // h ∈ [0, 510), s ∈ [0, 255), l ∈ [0, 255)
}

export function hexToHsi(hex) {
  const r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5)
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  const tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * PARAM, // original h ∈ [0,6), let h = h * 60 * 510 / 360, makes h ∈ [0,510)
    s = !df ? 0 : (df * 255) / (tt > 255 ? (510 - tt) : tt), // s ∈ [0,255)
    l = tt >> 1 // l ∈ [0,255)
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // 9 bit + 8 bit + 8 bit = 25 bit
}

export function hsiToInt2(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  // h += 1
  s += 1 // mock round
  l += 1 // mock round

  // Normalize HSL2 values to [0,1]
  h = h / 511.0  // Hue mapped from [0,511] to [0,1]
  s = s / 255.0  // Saturation mapped from [0,255] to [0,1]
  l = l / 256.0  // Lightness mapped from [0,255] to [0,1]

  let r, g, b

  // If saturation is 0, it's grayscale
  if (s === 0) {
    r = g = b = l
  } else {
    // Helper function to compute RGB components
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    // Compute intermediate values
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    // Compute RGB in [0,1]
    r = hue2rgb(p, q, h + 1 / 3) * 255
    g = hue2rgb(p, q, h) * 255
    b = hue2rgb(p, q, h - 1 / 3) * 255
  }

  // Scale to [0,255] and round
  // return [
  //   Math.round(r * 255),
  //   Math.round(g * 255),
  //   Math.round(b * 255)
  // ]
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  const hsl = [ round(h / PARAM * 60), round(s / 2.55), round(l / 2.55) ]
  return hslToInt(hsl)
}
export function hsiToInt3(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h = (h * 2) / PARAM // original h ∈ [0,510], then h = h * 12 / 510, aka (h << 1) / 85, makes h ∈ [0,12]
  s += 0.5 // mock round
  l += 1 // mock round
  const a = l <= 127.5 ? (s * l / 256) : (s - s * l / 255)
  const r = hf(0, h, a, l)
  const g = hf(8, h, a, l)
  const b = hf(4, h, a, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

export function bslToInt(h, s, l) {
  h = (h * 12) / 511 // original h ∈ [0,510], then h = h * 12 / 510, aka (h << 1) / 85, makes h ∈ [0,12]
  s += 0.5 // mock round
  l += 0.5 // mock round
  const a = l <= 127.5 ? (s * l / 255) : (s - s * l / 255)
  const r = hf(0, h, a, l)
  const g = hf(8, h, a, l)
  const b = hf(4, h, a, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

export function modHsi(int, dh, ds, dl) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h += dh, s += ds, l += dl
  s = s < 0 ? 0 : s > 0xFF ? 0xFF : s
  l = l < 0 ? 0 : l > 0xFF ? 0xFF : l
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // 9 bit + 8 bit + 8 bit = 25 bit
}

const round = x => ~~(x + 0.5)
export function hsiToHsl(int) {
  const h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  // return [ roundD1(h), roundD1(s / 2), roundD1(l / 2) ]
  console.log(h, s, l)
  return [ round(h / PARAM * 60), round(s / 2.55), round(l / 2.55) ]
}