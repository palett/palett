import { rgbToInt } from './rgbToInt'
import { dil6 }     from '../utils/hex'

/**
 * @param {[number,number,number]} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) => '#' + dil6(rgbToInt(rgb).toString(16))
