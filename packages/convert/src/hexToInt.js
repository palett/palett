import { hexAt, prolif } from '../utils/hex'


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
  if (hi === 3) {
    return (prolif(hexAt(hex, lo++)) << 16) | (prolif(hexAt(hex, lo++)) << 8) | (prolif(hexAt(hex, lo++)))
  }
  return 0
}

