import { hexToInt, hslToRgb } from '@palett/convert'
import { FORE_DEF, FORE_INI } from '@palett/enum-ansi-codes'
import { FORE, SC }           from '@palett/util-ansi'

export const assignInt = function (int) {
  this.head += SC + FORE_INI + SC + (int >> 16 & 0xFF) + SC + (int >> 8 & 0xFF) + SC + (int & 0xFF)
  this.tail += SC + FORE_DEF
  return this
}

export const assignRgb = function (rgb) {
  this.head += SC + FORE_INI + SC + FORE + SC + rgb[0] + SC + rgb[1] + SC + rgb[2]
  this.tail += SC + FORE_DEF
  return this
}

export const assignHex = function (hex) {
  return assignInt.call(this, hex |> hexToInt)
}

export const assignHsl = function (hsl) {
  return assignRgb.call(this, hsl |> hslToRgb)
}
