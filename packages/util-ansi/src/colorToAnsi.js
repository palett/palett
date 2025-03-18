import { hexToInt, hslToRgb } from '@palett/convert'
import { FORE }               from '../resources/colorModes.js'
import { SC }                 from '../resources/controlCodes.js'

/**
 *
 * @param {number[]} rgb - array of three integers, each from 0 to 255
 * @returns {string}
 */
export const rgbToAnsi = (rgb) => FORE + SC + rgb[0] + SC + rgb[1] + SC + rgb[2]

export const hexToAnsi = (hex) => {
  const int = hexToInt(hex)
  return FORE + SC + (int >> 16 & 0xFF) + SC + (int >> 8 & 0xFF) + SC + (int & 0xFF)
}

export const hslToAnsi = (hsl) => rgbToAnsi(hslToRgb(hsl))