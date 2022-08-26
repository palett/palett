import { SGR }        from '@palett/enum-ansi-codes'
import { SC }         from '@palett/util-ansi'
import { draw }       from './utils/draw.js'
import { initialize } from './utils/initialize.js'

export class IntDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr)
  }
  into(n) {
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(n) {
    return draw.bind(this.into(n))
  }
  render(n, text) {
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}