import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'
import { xyzToStr }                     from './xyzToStr'


/**
 * `[38;2;${head}${r};${g};${b}m${text}[${tail}39m`
 * @param {number[]} rgb
 * @return {string}
 */
export function rgbToStr(rgb) {
  const [ r, g, b ] = new Uint8ClampedArray(rgb)
  const head = (this?.head ?? '') + FORE_INI + SC + r + SC + g + SC + b
  const tail = (this?.tail ?? '') + FORE_DEF
  return CSI + head + SGR + xyzToStr(r, g, b) + CSI + tail + SGR
}


