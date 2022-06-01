import { Dye as RawDye, DyeFab }          from '@palett/dye-factory'
import { HexDye, HslDye, IntDye, RgbDye } from '@palett/dye-factory'

/**
 * @typedef {string|number|number[]} chroma
 */

/**
 *
 * @this {DyeFab}
 * @param {chroma} color
 * @returns {function(string):string}
 */
export function Dye(color) {
  const o = RgbDye.prototype.into.call(this ?? (new RawDye()), color)
  return RgbDye.prototype.render.bind(o)
}

/**
 *
 * @this {DyeFab}
 * @param {function(chroma):string} encolor
 * @param {chroma} color
 * @returns {function(string):string}
 */
Dye.make = function (color) {
  const o = RgbDye.prototype.into.call(this ?? (new RawDye()), color)
  return RgbDye.prototype.render.bind(o)
}

Dye.rgb = function (rgb) {
  const o = RgbDye.prototype.into.call(this ?? (new RawDye()), rgb)
  return RgbDye.prototype.render.bind(o)
}
Dye.hex = function (hex) {
  const o = HexDye.prototype.into.call(this ?? (new RawDye()), hex)
  return HexDye.prototype.render.bind(o)
}
Dye.hsl = function (hsl) {
  const o = HslDye.prototype.into.call(this ?? (new RawDye()), hsl)
  return HslDye.prototype.render.bind(o)
}
Dye.int = function (int) {
  const o = IntDye.prototype.into.call(this ?? (new RawDye()), int)
  return IntDye.prototype.render.bind(o)
}









