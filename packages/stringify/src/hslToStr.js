import { hslToInt }         from '@palett/convert'
import { render, xyzToStr } from './utils.js'

/**
 *
 * @param {number[]} hsl
 * @return {string}
 */
export function hslToStr(hsl) {
  const [ h, s, l ] = hsl, int = hslToInt(hsl)
  let r = int >> 16, g = int >> 8, b = int >> 0
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, xyzToStr(h, s, l))
}