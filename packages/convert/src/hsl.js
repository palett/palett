import { hexToRgi, rgbToRgi } from './rgi.js'
import { hue, round }         from './util/number-utils.js'

/** @typedef {[number,number,number]} HSL [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */

/** @returns {HSL} */
export function hexToHsl(hex) {
  return rgiToHsl.call(this, hexToRgi(hex))
}

/** @returns {HSL} */
export function rgiToHsl(int) {
  const of = this?.of ?? Array.of
  const r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  const tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 600, // h ∈ [0,6), then h = h * 600, makes h ∈ [0,3600)
    s = !df ? 0 : df * 1000 / (tt > 255 ? (510 - tt) : tt), // s ∈ [0, 1000]
    l = tt * 1.9607843137254903 // original l = ( hi + lo ) / 2 ∈ [0,255], then l = (tt / 2 * 1000 / 255), makes l ∈ [0,1000)
  return of(round(h) / 10, round(s) / 10, round(l) / 10)
}

/** @returns {HSL} */
export function rgbToHsl(rgb) {
  return rgiToHsl.call(this, rgbToRgi(rgb))
}

export function hsiToHsl(int) {
  const h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  return [ round(h), round(s / 2), round(l / 2) ]
}


