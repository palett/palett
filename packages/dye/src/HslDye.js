import { hslToInt }   from '@palett/convert'
import { SGR }        from '@palett/enum-ansi-codes'
import { SC }         from '@palett/util-ansi'
import { draw }       from './utils/draw.js'
import { initialize } from './utils/initialize.js'

export class HslDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr)
  }
  into(hsl) {
    const n = hslToInt(hsl)
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(hsl) {
    return draw.bind(this.into(hsl))
  }
  render(hsl, text) {
    const n = hslToInt(hsl)
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}