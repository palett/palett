import { E3, round }  from '@aryth/math'
import { bound, hue } from '@palett/convert'
import { HSL }        from '../types/HSL'

/**
 * !dif: dif===0
 * @param {number} r - [0,255]
 * @param {number} g - [0,255]
 * @param {number} b - [0,255]
 * @returns {[number,number,number]} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])]
 */
export function rgbToHsl([ r, g, b ]) {
  r /= 255
  g /= 255
  b /= 255
  const { max, sum, dif } = bound([ r, g, b ])
  let
    h = hue(r, g, b, max, dif) * 60,
    s = !dif
      ? 0
      : sum > 1
        ? dif / (2 - sum)
        : dif / sum,
    l = sum / 2
  return new HSL(round(h), round(s * E3) / 10, round(l * E3) / 10)
}
