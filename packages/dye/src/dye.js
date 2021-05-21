import { DyeFab, pushHex, pushHsl, pushInt, pushRgb } from '@palett/dye-factory'


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
  const local = this?.slice?.call(this) ?? DyeFab.shallow()
  if (color) (local.encolor ?? pushRgb).call(local, color)
  return DyeFab.prototype.render.bind(local)
}

/**
 *
 * @this {DyeFab}
 * @param {function(chroma):string} encolor
 * @param {chroma} color
 * @returns {function(string):string}
 */
Dye.internal = function (encolor, color) {
  const local = this?.slice?.call(this) ?? DyeFab.shallow()
  if (color) (encolor ?? local.encolor).call(local, color)
  return DyeFab.prototype.render.bind(local)
}

Dye.rgb = function (rgb) { return Dye.internal.call(this, pushRgb, rgb) }
Dye.hex = function (hex) { return Dye.internal.call(this, pushHex, hex) }
Dye.hsl = function (hsl) { return Dye.internal.call(this, pushHsl, hsl) }
Dye.int = function (int) { return Dye.internal.call(this, pushInt, int) }







