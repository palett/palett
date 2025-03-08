import { hexToInt, rgbToInt } from './int.js'
import { round }              from './number-utils.js'

/** @typedef {[number,number,number]} HSL [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */

/**
 * Calculates hue angle for HSL conversion from RGB components
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @param {number} hi - Maximum RGB component (0-255)
 * @param {number} df - Delta between max and min RGB components (0-255)
 * @returns {number} Hue value in range [0,6) corresponding to 0-360° when multiplied by 60
 * @note Returns 0 when all colors are equal (df = 0)
 */
export const hue = (r, g, b, hi, df) => {
  if (df === 0) return 0
  if (hi === r) return ((g - b) / df + 6) % 6
  if (hi === g) return (b - r) / df + 2
  if (hi === b) return (r - g) / df + 4
}

/** @returns {HSL} */
export function hexToHsl(hex) {
  return intToHsl(hexToInt(hex))
}

/** @returns {HSL} */
export function intToHsl(int) {
  const r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  const tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 600, // h ∈ [0,6), then h = h * 600, makes h ∈ [0,3600)
    s = !df ? 0 : df * 1000 / (tt > 255 ? (510 - tt) : tt), // s ∈ [0, 1000]
    l = tt * 1.9607843137254903 // original l = ( hi + lo ) / 2 ∈ [0,255], then l = (tt / 2 * 1000 / 255), makes l ∈ [0,1000)
  return [ round(h) / 10, round(s) / 10, round(l) / 10 ]
}

/** @returns {HSL} */
export function rgbToHsl(rgb) {
  return intToHsl(rgbToInt(rgb))
}


