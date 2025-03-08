import { round }             from './number-utils.js'
import { hf }                from './rgb.js'
import { ff, hexAt, prolif } from './string-utils.js'

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToInt(hex) {
  let lo = 0, hi = hex?.length
  if (hi === 7) lo++, hi--
  if (hi === 6) { return ff(hex, 1) << 16 | ff(hex, 3) << 8 | ff(hex, 5) }
  if (hi === 4) lo++, hi--
  if (hi === 3) { return (prolif(hexAt(hex, lo++)) << 16) | (prolif(hexAt(hex, lo++)) << 8) | (prolif(hexAt(hex, lo++))) }
  return 0
}


/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToShort(hex) {
  let lo = 0, hi = hex?.length
  if (hi === 7) lo++, hi--
  if (hi === 6) return hexAt(hex, lo) << 8 | hexAt(hex, lo += 2) << 4 | hexAt(hex, lo + 2)
  if (hi === 4) lo++, hi--
  if (hi === 3) return hexAt(hex, lo++) << 8 | hexAt(hex, lo++) << 4 | hexAt(hex, lo++)
  return 0
}

/**
 * @param {HSL} hsl
 * @returns {number}
 */
export function hslToInt(hsl) {
  const h = hsl[0] / 30, s = hsl[1] / 100, l = hsl[2] / 100
  const
    a = s * (l < 0.5 ? l : (1 - l)),
    r = hf(0, h, a, l),
    g = hf(8, h, a, l),
    b = hf(4, h, a, l)
  return (round(r * 0xFF) & 0xFF) << 16 | (round(g * 0xFF) & 0xFF) << 8 | round(b * 0xFF) & 0xFF
}

export function rgbToInt(rgb) { return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF) }


