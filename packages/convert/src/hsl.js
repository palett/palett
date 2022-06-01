import { hue }       from '../utils/rgb'
import { hexToInt }  from "./int";
import { E3, round } from '@aryth/math'

/** @typedef {[*,*,*]|{h,s,l}|HSL} HSL [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */

/**
 * @param r
 * @param g
 * @param b
 * @returns {HSL}
 */
export function fracToHsl(r, g, b) {
  const of = this?.of ?? Array.of
  let hi = r, lo = r
  {
    if (g > r) { hi = g } else { lo = g }
    if (b > hi) hi = b
    if (b < lo) lo = b
  }
  const sm = hi + lo, df = hi - lo
  const h = hue(r, g, b, hi, df) * 60,
        s = !df ? 0 : sm > 1 ? df / (2 - sm) : df / sm,
        l = sm / 2
  return of(round(h), round(s * E3) / 10, round(l * E3) / 10)
}

/** @returns {HSL} */
export function hexToHsl(hex) {
  return intToHsl.call(this, hexToInt(hex))
}

/** @returns {HSL} */
export function intToHsl(int) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  return fracToHsl.call(this, r / 255, g / 255, b / 255)
}

/** @returns {HSL} */
export function rgbToHsl(rgb) {
  const [r, g, b] = rgb
  return fracToHsl.call(this, r / 255, g / 255, b / 255)
}


