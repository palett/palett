import { draw, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye'

/**
 * @typedef {string|number|number[]} chroma
 */

export class Fluo {
  static hex(text, hex) { return draw.call(HexDye.prototype.into.call(this, hex), text) }
  static hsl(text, hsl) { return draw.call(HslDye.prototype.into.call(this, hsl), text) }
  static int(text, int) { return draw.call(IntDye.prototype.into.call(this, int), text) }
  static rgb(text, rgb) { return draw.call(RgbDye.prototype.into.call(this, rgb), text) }
}

export function fluo(text, rgb) { return draw.call(RgbDye.prototype.into.call(this, rgb), text) }