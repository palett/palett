import { dil6 }     from '../utils/hex'
import { hslToRgb } from "./rgb";
import { rgbToInt } from "./int";

export const hslToHex = (hsl) => hsl |> hslToRgb |> rgbToHex

export const intToHex = (int) => '#' + dil6(int.toString(16))

/**
 * @param {[*,*,*]|RGB} rgb
 * @returns {string}
 */
export const rgbToHex = (rgb) => '#' + dil6(rgbToInt(rgb).toString(16))
