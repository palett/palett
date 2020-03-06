import { rgbToInt } from './rgbToInt'

/**
 * @param {[number,number,number]} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) =>
  '#' + rgbToInt(rgb).toString(16).toUpperCase().padStart(6, '0')
