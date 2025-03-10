import { hexToRgi, hsiToRgi, hslToRgi } from '@palett/convert'
import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'
import { NUM, OBJ, STR }                from '@typen/enum-data-types'
import { HexDye }                       from './src/HexDye.js'
import { HslDye }                       from './src/HslDye.js'
import { IntDye }                       from './src/IntDye.js'
import { RgbDye }                       from './src/RgbDye.js'

export { draw }       from './src/utils/draw.js'
export { initialize } from './src/utils/initialize.js'
export { render }     from './src/render.js'

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

const HEAD = CSI + FORE_INI + SC
const TAIL = CSI + FORE_DEF + SGR

export function drgi(text) {
  const rgi = this
  if (typeof rgi !== NUM) return text
  const r = rgi >> 16 & 0xFF, g = rgi >> 8 & 0xFF, b = rgi & 0xFF
  return HEAD + r + SC + g + SC + b + SGR + text + TAIL
}

export function drgb(text) {
  const rgb = this
  if (typeof rgb !== OBJ) return text
  const [ r, g, b ] = rgb
  return HEAD + r + SC + g + SC + b + SGR + text + TAIL
}

export function dhsi(text) {
  const hsi = this
  if (typeof hsi !== NUM) return text
  return drgi.call(hsiToRgi(hsi), text)
}

export function dhsl(text) {
  const hsl = this
  if (typeof hsl !== OBJ) return text
  return drgi.call(hslToRgi(hsl), text)
}

export function dhex(text) {
  const hex = this
  if (!hex || typeof hex !== STR) return text
  return drgi.call(hexToRgi(hex), text)
}

export {
  HslDye,
  HexDye,
  IntDye,
  RgbDye,
  DyeFab as DyeFactory
}