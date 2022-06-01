import { RawDye, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye'

/**
 * @typedef {string|number|number[]} chroma
 */

export class Fluo {
  static hex(text, hex) {
    const ctx = HexDye.prototype.into.call(this ?? (new RawDye()), hex)
    return HexDye.prototype.draw.call(ctx, text)
  }
  static hsl(text, hsl) {
    const ctx = HslDye.prototype.into.call(this ?? (new RawDye()), hsl)
    return HslDye.prototype.draw.call(ctx, text)
  }
  static int(text, int) {
    const ctx = IntDye.prototype.into.call(this ?? (new RawDye()), int)
    return IntDye.prototype.draw.call(ctx, text)
  }
  static rgb(text, rgb) {
    const ctx = RgbDye.prototype.into.call(this ?? (new RawDye()), rgb)
    return RgbDye.prototype.draw.call(ctx, text)
  }

}

export function fluo(text, color) {
  const o = RgbDye.prototype.into.call(this ?? (new RawDye()), color)
  return RgbDye.prototype.draw.bind(o)
}