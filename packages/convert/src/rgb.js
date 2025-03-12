import { hexToRgi } from './rgi.js'
import { centFF }   from './util/number-utils.js'

/** @typedef {[number,number,number]} RGB */

const { min } = Math

/** @returns {RGB} */
export function hexToRgb(hex) {
  const of = this?.of ?? Array.of
  const int = hexToRgi(hex)
  return of(int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
}

/** @returns {RGB} */
export function rgiToRgb(int) {
  const of = this?.of ?? Array.of
  return of(int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
}

/** @returns {RGB} */
export function hslToRgb(hsl) {
  const of = this?.of ?? Array.of
  const h = hsl[0] / 30, s = hsl[1], l = hsl[2]
  const a = s * (l <= 50 ? l : (100 - l)) / 100,
    r = centFF(0, h, a, l),
    g = centFF(8, h, a, l),
    b = centFF(4, h, a, l)
  return of(r, g, b)
}

