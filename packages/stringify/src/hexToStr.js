import { hexToInt }         from '@palett/convert'
import { render, xyzToStr } from './utils.js'

/**
 *
 * @param {string} hex
 * @return {string}
 */
export function hexToStr(hex) {
  hex = hex?.toUpperCase()
  const int = hexToInt(hex)
  let r = int >> 16, g = int >> 8, b = int >> 0
  return render.call(this, r & 0xFF, g & 0xFF, b & 0xFF, hex)
}

export function hexToSpec(hex) {
  hex = hex?.toUpperCase()
  const int = hexToInt(hex)
  let r = int >> 16, g = int >> 8, b = int >> 0
  return render.call(this, r &= 0xFF, g &= 0xFF, b &= 0xFF, hex + ' ' + xyzToStr(r, g, b))
}


