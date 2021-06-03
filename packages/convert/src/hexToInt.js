import { diluteHex } from '../utils/hex/diluteHex'

function hexAt(tx, i) {
  let n = tx.codePointAt(i)
  const seg = n >> 5
  return seg <= 1 ? n & 0xf : ( n & 0x7 ) + 9
}
const dual = n => n << 4 | n


/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToInt(hex) {
  let lo = 0, hi = hex.length
  if (hi === 7) lo++, hi--
  if (hi === 6) {
    const r = ( hexAt(hex, lo++) << 4 ) | hexAt(hex, lo++)
    const g = ( hexAt(hex, lo++) << 4 ) | hexAt(hex, lo++)
    const b = ( hexAt(hex, lo++) << 4 ) | hexAt(hex, lo++)
    return r << 16 | g << 8 | b
  }
  if (hi === 4) lo++, hi--
  if (hi === 3) {
    return (dual(hexAt(hex, lo++)) << 16) | (dual(hexAt(hex, lo++)) << 8) | ( dual(hexAt(hex, lo++)))
  }
  return 0
}


/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToIntClassic(hex) {
  if (hex.charAt(0) === '#') hex = hex.slice(1)
  if (!hex[3]) hex = diluteHex(hex)
  return parseInt(hex, 16)
}
