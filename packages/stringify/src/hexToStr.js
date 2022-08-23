import { hexToInt } from '@palett/convert'
import { intToStr } from './intToStr.js'

/**
 *
 * @param {string} hex
 * @return {string}
 */
export function hexToStr(hex) {
  return intToStr.call(this,hexToInt(hex))
}


