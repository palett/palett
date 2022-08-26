import { SGR }        from '@palett/enum-ansi-codes'
import { SC }         from '@palett/util-ansi'
import { draw }       from './utils/draw.js'
import { initialize } from './utils/initialize.js'

export class RgbDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr)
  }
  into([ r, g, b ]) {
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(rgb) {
    return draw.bind(this.into(rgb))
  }
  render([ r, g, b ], text) {
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}