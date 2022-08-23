import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'
import { xyzToStr }                     from './xyzToStr.js'

/**
 *
 * @param {number} int
 * @return {string}
 */
export function intToStr(int) {
  const r = (int >> 16) & 0xFF, g = (int >> 8) & 0xFF, b = (int >> 0) & 0xFF
  const head = (this?.head ?? '') + FORE_INI + SC + r + SC + g + SC + b
  const tail = (this?.tail ?? '') + FORE_DEF
  return CSI + head + SGR + xyzToStr(r, g, b) + CSI + tail + SGR
}