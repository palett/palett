import { ff } from '@palett/convert'

export function narrowSL(hex) {
  let { sb, sp, lb, lp } = this
  const r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5)
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  let ll = hi + lo
  if (ll <= (lb << 1) || (lp << 1) <= ll) return false
  const df = hi - lo,
    s = !df ? 0 : (df << 8) / (ll > 255 ? (510 - ll) : ll) // s ∈ [0,512)
  return (sb < s && s < sp) // Return true if saturation is less than thresS
}