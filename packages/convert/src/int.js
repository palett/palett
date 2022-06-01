import { round }         from '@aryth/math'
import { hexAt, prolif } from '../utils/hex'
import { hf }            from '../utils/hsl'

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToInt(hex) {
  let lo = 0, hi = hex?.length
  if (hi === 7) lo++, hi--
  if (hi === 6) {
    const r = (hexAt(hex, lo++) << 4) | hexAt(hex, lo++)
    const g = (hexAt(hex, lo++) << 4) | hexAt(hex, lo++)
    const b = (hexAt(hex, lo++) << 4) | hexAt(hex, lo++)
    return r << 16 | g << 8 | b
  }
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
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {number}
 */
export function hslToInt([h, s, l]) {
  s /= 100, l /= 100
  const
    a = s * Math.min(l, 1 - l),
    r = hf(0, h, a, l),
    g = hf(8, h, a, l),
    b = hf(4, h, a, l)
  return ((round(r * 0xFF) & 0xFF) << 16) + ((round(g * 0xFF) & 0xFF) << 8) + (round(b * 0xFF) & 0xFF)
}

export function rgbToInt([r, g, b]) { return ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF); }


