import { ff }  from '@palett/convert'
import { hue } from '../src/color-utils.js'

/**
 * Assign HSL values from a hexadecimal color code to this (target vector).
 * @param {string} hex - The hexadecimal color code (e.g., "#RRGGBB").
 * @param {number} [i=0] - The starting index in the target vector.
 * @returns {Array} - This, the target vector with HSL values assigned.
 */
export function assignHsl(hex, i = 0) {
  const vec = this, r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5) // R,G,B channel (byte)
  let hi, lo // Determine dominant and subordinate color channels
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)  // Find initial max/min between R and G
  b > hi ? hi = b : b < lo ? lo = b : void 0   // Compare B with current max/min
  const tt = hi + lo, df = hi - lo  // Sum of max + min (range 0-510), Difference between max and min
  vec[i++] = hue(r, g, b, hi, df) * 85 // Hue ∈ [0,510). Original h ∈ [0,6), then -> h * 60 * 510 / 360 ∈ [0,510)
  vec[i++] = !df ? 0 : (df * 255) / (tt > 255 ? (510 - tt) : tt) // Saturation ∈ [0,255)
  vec[i++] = tt >> 1 // Lightness ∈ [0,255), average of max and min
  return vec // Store HSL values in the target vector
}

export function assignHex(hex, i = 0) {
  const vec = this
  vec[i++] = ff(hex, 1)
  vec[i++] = ff(hex, 3)
  vec[i++] = ff(hex, 5)
  return vec
}