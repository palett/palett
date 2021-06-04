import { hexAt, prolif } from '../utils/hex'


/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToShort(hex) {
  let lo = 0, hi = hex.length
  if (hi === 7) lo++, hi--
  if (hi === 6) return hexAt(hex, lo++) << 8 | hexAt(hex, lo += 2) << 4 | hexAt(hex, lo += 2)
  if (hi === 4) lo++, hi--
  if (hi === 3) return hexAt(hex, lo++) << 8 | hexAt(hex, lo++) << 4 | hexAt(hex, lo++)
  return 0
}

