import { rgbToLong } from './rgbToLong'

/**
 * @param {[number,number,number]} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) =>
  '#' + rgbToLong(rgb).toString(16).toUpperCase().padStart(6, '0')
