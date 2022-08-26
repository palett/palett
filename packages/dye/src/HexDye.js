import { hexToInt }   from '@palett/convert'
import { SGR }        from '@palett/enum-ansi-codes'
import { SC }         from '@palett/util-ansi'
import { draw }       from './utils/draw.js'
import { initialize } from './utils/initialize.js'

export class HexDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr)
  }
  static init(ctx) {
    const dye = new HexDye()
    dye.head = ctx.head
    dye.tail = ctx.tail
    return dye
  }

  into(hex) {
    const n = hexToInt(hex)
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(hex) {
    return draw.bind(this.into(hex))
  }
  render(hex, text) {
    const n = hexToInt(hex)
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}