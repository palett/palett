import { hexToInt } from '@palett/convert'
import { RGB }      from '../RGB'

/**
 *
 * @param {string} hex
 * @returns {RGB}
 */
export function hexToRgb(hex) {
  const int = hexToInt(hex)
  return new RGB( int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF )
}