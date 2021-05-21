import { hexToInt, hslToRgb } from '@palett/convert'
import { FORE_DEF, FORE_INI } from '@palett/enum-ansi-codes'
import { HEX, HSL, INT, RGB } from '@palett/enum-color-space'
import { SC }                 from '@palett/util-ansi'
import { excite }             from './excite'

/** @param {number} int */
export function pushInt(int) {
  excite.call(this)
  this.head += FORE_INI + SC + (int >> 16 & 0xFF) + SC + (int >> 8 & 0xFF) + SC + (int & 0xFF)
  this.tail += FORE_DEF
  return this
}
/** @param {number[]} rgb */
export function pushRgb(rgb) {
  excite.call(this)
  this.head += FORE_INI + SC + rgb[0] + SC + rgb[1] + SC + rgb[2]
  this.tail += FORE_DEF
  return this
}
/** @param {string} hex */
export function pushHex(hex) { return pushInt.call(this, hex |> hexToInt) }
/** @param {number[]} hsl */
export function pushHsl(hsl) { return pushRgb.call(this, hsl |> hslToRgb) }

export const selectEncolor = space =>
  space === RGB ? pushRgb :
    space === HEX ? pushHex :
      space === HSL ? pushHsl :
        space === INT ? pushInt :
          pushRgb