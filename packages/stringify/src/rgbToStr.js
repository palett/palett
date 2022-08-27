import { render, xyzToStr } from './utils.js'


/**
 * `[38;2;${head}${r};${g};${b}m${text}[${tail}39m`
 * @param {number[]} rgb
 * @return {string}
 */
export function rgbToStr([ r, g, b ]) {
  return render.call(this, r &= 0xFF, g &= 0xFF, b &= 0xFF, xyzToStr(r, g, b))
}


