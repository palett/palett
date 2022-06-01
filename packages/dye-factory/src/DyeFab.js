import { draw, Dye, repl }    from './Dye'
import { hexToInt, hslToInt } from '@palett/convert'


export class HexDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new HexDye(ctx?.head, ctx?.tail) }
  into(c) { return c = hexToInt(c), repl.call(this, c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
  make(c) { return draw.bind(HexDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(HexDye.prototype.into.call(this, c), tx) }
}

export class HslDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new HslDye(ctx?.head, ctx?.tail) }
  into(c) { return c = hslToInt(c), repl.call(this, c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
  make(c) { return draw.bind(HslDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(HslDye.prototype.into.call(this, c), tx) }
}

export class IntDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new IntDye(ctx?.head, ctx?.tail) }
  into(c) { return repl.call(this, c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
  make(c) { return draw.bind(IntDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(IntDye.prototype.into.call(this, c), tx) }
}

export class RgbDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new RgbDye(ctx?.head, ctx?.tail) }
  into([r, g, b]) { return repl.call(this, r, g, b) }
  make(c) { return draw.bind(RgbDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(RgbDye.prototype.into.call(this, c), tx) }
}

export class DyeFab {
  /** @type {Dye} */ base
  constructor(dye) { this.base = dye }
  static build(space, style) { return (DyeFab[space] ?? DyeFab.rgb).apply(null, style) }
  static prep(space, ...style) { return (DyeFab[space] ?? DyeFab.rgb).apply(null, style) }
  static hex(...style) { return (new HexDye()).style(style) }
  static hsl(...style) { return (new HslDye()).style(style) }
  static int(...style) { return (new IntDye()).style(style) }
  static rgb(...style) { return (new RgbDye()).style(style) }
}

