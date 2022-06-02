import { Dye, HexDye, HslDye, IntDye, RgbDye } from './Dye'

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

