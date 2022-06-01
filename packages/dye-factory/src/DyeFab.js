import { Dye }                from './Dye'
import { hexToInt, hslToInt } from '@palett/convert'


export class HexDye extends Dye {
  constructor(style) { super(), this.style(style) }
  into(c) { return c = hexToInt(c), super.repl(c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
}

export class HslDye extends Dye {
  constructor(style) { super(), this.style(style) }
  into(c) { return c = hslToInt(c), super.repl(c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
}

export class IntDye extends Dye {
  constructor(style) { super(), this.style(style) }
  into(c) { return super.repl(c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
}

export class RgbDye extends Dye {
  constructor(style) { super(), this.style(style) }
  into([r, g, b]) { return super.repl(r, g, b) }
}

export class DyeFab {
  /** @type {Dye} */ base
  constructor(dye) { this.base = dye }
  static build(space, style) {
    if (!(space in DyeFab)) return null
    const dye = DyeFab[space].apply(null, style)
    return dye.style(style), dye
  }
  static prep(space, ...style) { return DyeFab.build(space, style) }
  static hex(...style) { return new HexDye(style) }
  static hsl(...style) { return new HslDye(style) }
  static int(...style) { return new IntDye(style) }
  static rgb(...style) { return new RgbDye(style) }
}

