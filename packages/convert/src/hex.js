import { hsiToRgi, hslToRgi, rgbToRgi } from './rgi.js'
import { dil6 }                         from './util/string-utils.js'

export const hslToHex = (hsl) => rgiToHex(hslToRgi(hsl))

export const hsiToHex = (hsi) => rgiToHex(hsiToRgi(hsi))

export const rgiToHex = (int) => '#' + dil6(int.toString(16))

/**
 * @param {[number,number,number]|RGB} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) => '#' + dil6(rgbToRgi(rgb).toString(16))
