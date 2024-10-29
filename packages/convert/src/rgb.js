import { round }    from '@aryth/math'
import { hexToInt } from './int.js'
import { hf }       from '../utils/hsl.js'

/** @typedef {[*,*,*]|{r,g,b}|RGB} RGB */

/** @returns {RGB} */
export function hexToRgb(hex) {
  const of = this?.of ?? Array.of
  const int = hexToInt(hex)
  return of(int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
}

/** @returns {RGB} */
export function intToRgb(n) {
  const of = this?.of ?? Array.of
  return of(n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF)
}

export function fracToRgb(h, s, l) {
  const of = this?.of ?? Array.of
  s /= 100, l /= 100
  const a = s * Math.min(l, 1 - l), r = hf(0, h, a, l), g = hf(8, h, a, l), b = hf(4, h, a, l)
  return of(round(r * 0xFF), round(g * 0xFF), round(b * 0xFF))
}

/** @returns {RGB} */
export function hslToRgb(hsl) {
  return fracToRgb.apply(this, hsl)
}

