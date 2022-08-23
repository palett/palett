import { hslToInt } from '@palett/convert'
import { intToStr } from './intToStr.js'

/**
 *
 * @param {number[]} hsl
 * @return {string}
 */
export function hslToStr(hsl) {
  return intToStr.call(this, hslToInt(hsl))
}