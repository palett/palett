import { ff }             from '@palett/convert'
import { hue, roundByte } from './color-utils.js'

export function hexToHsi(hex) {
  const r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5)
  return rgaToHsi(r, g, b)
}

export function rgaToHsi(r, g, b) {
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  let tt = hi + lo, df = hi - lo
  const h = hue(r, g, b, hi, df) * 60 // original h ∈ [0,6), then h = h * 60, makes h ∈ [0,360)
  const s = !df ? 0 : (df * 200) / (tt > 255 ? (510 - tt) : tt) // s ∈ [0,512)
  const l = (tt * 200) / 510
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // h ∈ [0, 360), s ∈ [0, 512), l ∈ [0, 512)
}

export function hsiToHsl(int) {
  const h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  return [ roundByte(h), roundByte(s / 2), roundByte(l / 2) ]
}

export function hsiToInt(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  return hsaToInt(h, s, l)
}

export function hsaToInt(h, s, l) {
  h = h / 30
  s += 0.5
  l += 0.5
  const amp = s * (l <= 100 ? l : 200 - l) / 200 // When lightness is low, increase it proportionally to saturation, 亮度系数, coefficient or chroma
  function channel(off, hf, amp, lt) {
    let pha = (off + hf) % 12 // Calculate modular position in color wheel. 相位偏移
    pha = 3 + (pha < 6 ? pha - 6 : 6 - pha) // Create triangular wave pattern, 对称波形生成
    pha = pha > 1 ? 1 : pha < -1 ? -1 : pha // Clamp to [-1, 1] range. 钳制到 [-1, 1]
    return ((lt - amp * pha) * 2.55) >> 1 // Apply chroma to get final component value. 合并乘法和舍入
  }
  const r = channel(0, h, amp, l)
  const g = channel(8, h, amp, l)
  const b = channel(4, h, amp, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

export function modHsi(int, dh, ds, dl) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h += dh, s += ds, l += dl
  while (h > 360) h -= 360
  while (h < 0) h += 360
  s = s < 0 ? 0 : s > 200 ? 200 : s
  l = l < 0 ? 0 : l > 200 ? 200 : l
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // 9 bit + 9 bit + 9 bit = 25 bit
}