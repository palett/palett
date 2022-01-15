import { hexToInt } from '@palett/convert'
import { RGB }      from '../types/RGB'

/**
 *
 * @param {string} hex
 * @returns {number[]}
 */
export function hexToRgb(hex) {
  const int = hexToInt(hex)
  return new RGB( int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF )
}
