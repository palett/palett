import { Dye as RawDye, DyeFab, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye-factory'

export { Dye as RawDye, DyeFab, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye-factory'

/**
 * @function
 * @param {string} text
 * @param color
 * @returns {string}
 */
export const dye = function (text, color) {
  let ctx = this ?? (new RawDye())
  if (color) ctx = RgbDye.prototype.into.call(ctx, color)
  return RgbDye.prototype.draw.call(ctx, text)
}

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
  return RgbDye.prototype.draw.bind(o)
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
  return RgbDye.prototype.draw.bind(o)
}


Dye.hex = function (hex) {
  const o = HexDye.prototype.into.call(this ?? (new RawDye()), hex)
  return HexDye.prototype.draw.bind(o)
}
Dye.hsl = function (hsl) {
  const o = HslDye.prototype.into.call(this ?? (new RawDye()), hsl)
  return HslDye.prototype.draw.bind(o)
}
Dye.int = function (int) {
  const o = IntDye.prototype.into.call(this ?? (new RawDye()), int)
  return IntDye.prototype.draw.bind(o)
}
Dye.rgb = function (rgb) {
  const o = RgbDye.prototype.into.call(this ?? (new RawDye()), rgb)
  return RgbDye.prototype.draw.bind(o)
}









