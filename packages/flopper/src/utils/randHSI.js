import { round } from '@aryth/math'
import { n }     from '@aryth/norm'

const { cos, PI } = Math

export const neonS = (h) => {
  if ((h %= 360) < 0) h += 360 // clamp to 0 to 360
  let s = 27 * cos((2 * PI / 180) * (h - 20)) + 57
  if (110 < h && h < 290) s = (s - 30) * 0.5 + 30
  return s
}
export const neonL = (h) => 72 + n(6)
export const neonHSI = h => {
  let s = neonS(h), l = neonL(h)
  s += n(6)
  l += n(6)
  if ((h %= 360) < 0) h += 360
  return (round(h) & 0x1FF) << 16 | (round(s * 2) & 0xFF) << 8 | round(l * 2) & 0xFF
}

export const primS = (h) => 45 + 15 * cos(2 * PI * h / 180) // 24 - 54
export const primL = (h) => 54 + 12 * cos(PI * (h - 60) / 180) // 42 - 66
export const primHSI = h => {
  let s = primS(h), l = primL(h)
  // h += abs(n(0, 10))
  s += -1 + n(3)
  l += 6 + n(6)
  if ((h %= 360) < 0) h += 360
  return (round(h) & 0x1FF) << 16 | (round(s * 2) & 0xFF) << 8 | round(l * 2) & 0xFF
}

export const randHSI = h => n() > 0 ? primHSI(h) : neonHSI(h)
