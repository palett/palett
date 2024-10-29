import { dil6 }     from '../utils/hex.js'
import { hslToRgb } from './rgb.js'
import { rgbToInt } from './int.js'

export const hslToHex = (hsl) => rgbToHex(hslToRgb(hsl))

export const intToHex = (int) => '#' + dil6(int.toString(16))

/**
 * @param {[*,*,*]|RGB} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) => '#' + dil6(rgbToInt(rgb).toString(16))
