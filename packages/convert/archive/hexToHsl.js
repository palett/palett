import { hexAt } from '../src/string-utils.js'
import { hue }   from '../test/beta/beta.js'

export function hex_hsl(hex) {
  let hi, lo, i = 0
  const r = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  const g = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  const b = hexAt(hex, ++i) << 4 | hexAt(hex, ++i)
  {
    g > r ? (hi = g, lo = r) : (hi = r, lo = g)
    b > hi ? hi = b : b < lo ? lo = b : void 0
  }
  const tt = hi + lo, df = hi - lo
  const h = (hue(r, g, b, hi, df) * 60)
  const s = (!df ? 0 : tt > 255 ? df / (510 - tt) : df / tt) * 255
  const l = tt / 2
  return ((h & 0x1FF) << 16) | ((s & 0xFF) << 8) | (l & 0xFF)
}