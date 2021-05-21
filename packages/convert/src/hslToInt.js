import { round } from '@aryth/math'
import { hf }    from '../utils/hsl/hf'

/**
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {number}
 */
export function hslToInt([ h, s, l ]) {
  s /= 100
  l /= 100
  const
    a = s * Math.min(l, 1 - l),
    r = hf(0, h, a, l),
    g = hf(8, h, a, l),
    b = hf(4, h, a, l)
  return (
    ((round(r * 0xFF) & 0xFF) << 16) +
    ((round(g * 0xFF) & 0xFF) << 8) +
    (round(b * 0xFF) & 0xFF)
  )
}
