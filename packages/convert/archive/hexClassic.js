import { diluteHex } from '../utils/hex.js'

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexClassic(hex) {
  if (hex.charAt(0) === '#') hex = hex.slice(1)
  if (!hex[3]) hex = diluteHex(hex)
  return parseInt(hex, 16)
}