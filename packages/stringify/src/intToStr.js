import { render, xyzToStr } from './utils.js'

/**
 *
 * @param {number} int
 * @return {string}
 */
export function intToStr(int) {
  let r = int >> 16, g = int >> 8, b = int >> 0
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, int.toString().padStart(8, '0'))
}

/**
 *
 * @param {number} int
 * @return {string}
 */
export function intToSpec(int) {
  let r = int >> 16, g = int >> 8, b = int >> 0
  return render.call(this, r &= 0xFF, g &= 0xFF, b &= 0xFF, int.toString().padStart(8, '0') + ' ' + xyzToStr(r, g, b))
}