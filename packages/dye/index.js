import { Dye as RawDye, DyeFab, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye-factory'

export { Dye as RawDye, DyeFab, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye-factory'

/**
 * @function
 * @param {string} text
 * @param color
 * @returns {string}
 */
export const dye = function (text, color) {
  let ctx = this
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
  const ctx = RgbDye.prototype.into.call(this, color)
  return RgbDye.prototype.draw.bind(ctx)
}

/**
 *
 * @this {DyeFab}
 * @param {function(chroma):string} encolor
 * @param {chroma} color
 * @returns {function(string):string}
 */
Dye.make = function (color) {
  const ctx = RgbDye.prototype.into.call(this, color)
  return RgbDye.prototype.draw.bind(ctx)
}

Dye.hex = function (hex) {
  const ctx = HexDye.prototype.into.call(this, hex)
  return HexDye.prototype.draw.bind(ctx)
}
Dye.hsl = function (hsl) {
  const ctx = HslDye.prototype.into.call(this, hsl)
  return HslDye.prototype.draw.bind(ctx)
}
Dye.int = function (int) {
  const ctx = IntDye.prototype.into.call(this, int)
  return IntDye.prototype.draw.bind(ctx)
}
Dye.rgb = function (rgb) {
  const ctx = RgbDye.prototype.into.call(this, rgb)
  return RgbDye.prototype.draw.bind(ctx)
}









