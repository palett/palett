import { diluteHex } from './index'

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToIntClassic(hex) {
  if (hex.charAt(0) === '#') hex = hex.slice(1)
  if (!hex[3]) hex = diluteHex(hex)
  return parseInt(hex, 16)
}