import { dilhex } from '../utils/hex/dilhex'

/**
 *
 * @param {string} hex
 * @returns {number[]}
 */
export function hexToRgb (hex) {
  if (hex.charAt(0) === '#') hex = hex.substring(1)
  if (!hex[3]) hex = dilhex(hex)
  const n = parseInt(hex, 16)
  return [n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF]
}
