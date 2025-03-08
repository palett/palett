import { rgbToInt } from './int.js'
import { hslToRgb } from './rgb.js'
import { dil6 }     from './string-utils.js'

export const hslToHex = (hsl) => rgbToHex(hslToRgb(hsl))

export const intToHex = (int) => '#' + dil6(int.toString(16))

/**
 * @param {[number,number,number]|RGB} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) => '#' + dil6(rgbToInt(rgb).toString(16))
