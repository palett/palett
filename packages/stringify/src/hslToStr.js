import { hslToInt }         from '@palett/convert'
import { render, xyzToStr } from './utils.js'

/**
 *
 * @param {number[]} hsl
 * @return {string}
 */
export function hslToStr(hsl) {
  const int = hslToInt(hsl)
  let r = int >> 16, g = int >> 8, b = int >> 0
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, xyzToStr(hsl[0], hsl[1], hsl[2]))
}