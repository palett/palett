import { HslDye } from './src/HslDye.js'
import { HexDye } from './src/HexDye.js'
import { IntDye } from './src/IntDye.js'
import { RgbDye } from './src/RgbDye.js'

export class DyeFab {
  static build(space, attr) { return DyeFab[space ?? 'rgb'](attr) }
  static prep(space, attr) { return DyeFab[space ?? 'rgb'](attr) }
  static hex(attr) { return new HexDye(attr) }
  static hsl(attr) { return new HslDye(attr) }
  static int(attr) { return new IntDye(attr) }
  static rgb(attr) { return new RgbDye(attr) }
}

export class Dye {
  static hex(color, attr) { return (new HexDye(attr)).make(color) }
  static hsl(color, attr) { return (new HslDye(attr)).make(color) }
  static int(color, attr) { return (new IntDye(attr)).make(color) }
  static rgb(color, attr) { return (new RgbDye(attr)).make(color) }
}

export {
  HslDye,
  HexDye,
  IntDye,
  RgbDye,
  DyeFab as DyeFactory
}