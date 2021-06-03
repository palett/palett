import { hexToInt } from './hexToInt'

/**
 *
 * @param {string} hex
 * @returns {number[]}
 */
export function hexToRgb(hex) {
  const int = hexToInt(hex)
  return [ int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF ]
}
