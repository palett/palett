import { hexToInt } from './int.js'
import { round }    from './number-utils.js'

/** @typedef {[number,number,number]} RGB */

const { min } = Math

/**
 * Helper function for HSL to RGB conversion.
 * @param {number} n r: 0 or 12, g: -4 or 8, b: -8 or 4. Offset for color component
 * @param {number} h from 0 to 12 (0 to 360). Hue value
 * @param {number} a (s * l) or (s * (1 - l)). Chroma value
 * @param {number} l from 0 to 1. Lightness value
 * @returns {number} Color component value
 */
export const hf = (n, h, a, l) => {
  let x = (n + h) % 12
  x = min(x - 3, 9 - x) // equivalent to: if (m < 6) { m - 3 } else { 9 - m }
  x = x > 1 ? 1 : x < -1 ? -1 : x // limBy(min(k - 3, 9 - k), -1, 1)
  return l - a * x
}

/** @returns {RGB} */
export function hexToRgb(hex) {
  const int = hexToInt(hex)
  return [ int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF ]
}

/** @returns {RGB} */
export function intToRgb(int) {
  return [ int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF ]
}

/** @returns {RGB} */
export function hslToRgb(hsl) {
  const h = hsl[0] / 30, s = hsl[1], l = hsl[2]
  const a = s * (l <= 50 ? l : (100 - l)) / 100,
    r = hf(0, h, a, l),
    g = hf(8, h, a, l),
    b = hf(4, h, a, l)
  return [ round(r * 2.55), round(g * 2.55), round(b * 2.55) ]
}

