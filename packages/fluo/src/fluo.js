import { DyeFab, pushHex, pushHsl, pushInt, pushRgb } from '@palett/dye-factory'


/**
 * @typedef {string|number|number[]} chroma
 */

/**
 *
 * @this {DyeFab}
 * @param {string|any} text
 * @param {chroma} color
 * @returns {function(string):string}
 */
export function Fluo(text, color) {
  const local = this?.slice?.call(this) ?? DyeFab.shallow()
  if (color) (local.encolor ?? pushRgb).call(local, color)
  return DyeFab.prototype.render.call(local, text)
}

/**
 *
 * @this {DyeFab}
 * @param {function(chroma):string} encolor
 * @param {string|any} text
 * @param {chroma} color
 * @returns {function(string):string}
 */
Fluo.render = function (encolor, text, color) {
  const local = this?.slice?.call(this) ?? DyeFab.shallow()
  if (color) (encolor ?? local.encolor).call(local, color)
  return DyeFab.prototype.render.call(local, text)
}

Fluo.rgb = function (text, rgb) { return Fluo.render.call(this, pushRgb, text, rgb) }
Fluo.hex = function (text, hex) { return Fluo.render.call(this, pushHex, text, hex) }
Fluo.hsl = function (text, hsl) { return Fluo.render.call(this, pushHsl, text, hsl) }
Fluo.int = function (text, int) { return Fluo.render.call(this, pushInt, text, int) }