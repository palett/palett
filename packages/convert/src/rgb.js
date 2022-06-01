import { round }    from '@aryth/math'
import { hexToInt } from "./int"
import { hf }       from '../utils/hsl'

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
  return of(n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF);
}

/** @returns {RGB} */
export function hslToRgb(hsl) {
  const of = this?.of ?? Array.of
  let [h, s, l] = hsl
  s /= 100, l /= 100
  const au = s * Math.min(l, 1 - l), r = hf(0, h, au, l), g = hf(8, h, au, l), b = hf(4, h, au, l)
  return of(round(r * 0xFF), round(g * 0xFF), round(b * 0xFF)) // return [r * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
}

