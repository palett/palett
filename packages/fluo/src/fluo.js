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
export class Fluo {
  /**
   *
   * @this {DyeFab}
   * @param {function(chroma):string} encolor
   * @param {string|any} text
   * @param {chroma} color
   * @returns {function(string):string}
   */
  static render(encolor, text, color) {
    const local = this?.slice?.call(this) ?? DyeFab.shallow()
    if (color) (encolor ?? local.encolor).call(local, color)
    return DyeFab.prototype.render.call(local, text)
  }

  static rgb(text, rgb) { return Fluo.render.call(this, pushRgb, text, rgb) }
  static hex(text, hex) { return Fluo.render.call(this, pushHex, text, hex) }
  static hsl(text, hsl) { return Fluo.render.call(this, pushHsl, text, hsl) }
  static int(text, int) { return Fluo.render.call(this, pushInt, text, int) }
}

export function fluo(text, color) {
  const local = this?.slice?.call(this) ?? DyeFab.shallow()
  if (color) (local.encolor ?? pushRgb).call(local, color)
  return DyeFab.prototype.render.call(local, text)
}