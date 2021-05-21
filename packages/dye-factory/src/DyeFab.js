import { CSI, SGR }      from '@palett/enum-ansi-codes'
import { selectEncolor } from './encolor'
import { enstyle }       from './enstyle'

export class DyeFab {
  head = ''
  tail = ''
  constructor() {}
  static build() { return new DyeFab() }
  static prep(...effects) { return new DyeFab().enstyle(effects) }
  init() { return this.head = '', this.tail = '', this }
  slice() { return { head: this.head, tail: this.tail } }
  copy() { return new DyeFab().inject(this.head, this.tail) }
  /**
   * @param {string} head
   * @param {string} tail
   */
  inject(head, tail) {
    if (head) this.head = head
    if (tail) this.tail = tail
    return this
  }
  /** @param {string[]} styles */
  enstyle(styles) { return enstyle.call(this, styles) }
  setEncolor(space) { return this.encolor = selectEncolor(space), this }
  render(text) { return CSI + this.head + SGR + text + CSI + this.tail + SGR }
}