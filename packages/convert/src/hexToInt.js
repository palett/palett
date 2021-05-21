import { diluteHex } from '../utils/hex/diluteHex'

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToInt(hex) {
  if (hex.charAt(0) === '#') hex = hex.substring(1)
  if (!hex[3]) hex = diluteHex(hex)
  return parseInt(hex, 16)
}
