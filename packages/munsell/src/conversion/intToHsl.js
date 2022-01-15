import { round }      from '@aryth/math'
import { bound, hue } from '@palett/convert'
import { HSL }        from '../types/HSL'

const THOUSAND = 1000

/**
 * !dif: dif===0
 * @param {number} int
 * @returns {[number,number,number]} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])]
 */
export function intToHsl(int) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  r /= 255
  g /= 255
  b /= 255
  const { max, sum, dif } = bound([ r, g, b ])
  let
    h = hue(r, g, b, max, dif) * 60,
    s = !dif
      ? 0
      : sum > 1
        ? dif / ( 2 - sum )
        : dif / sum,
    l = sum / 2
  return new HSL( round(h), round(s * THOUSAND) / 10, round(l * THOUSAND) / 10 )
}
