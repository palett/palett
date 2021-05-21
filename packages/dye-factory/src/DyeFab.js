import { CSI, SGR }      from '@palett/enum-ansi-codes'
import { selectEncolor } from './encolor'
import { enstyle }       from './enstyle'

export class DyeFab {
  head = ''
  tail = ''
  constructor(space, style) {
    if (space) this.setEncolor(space)
    if (style) this.enstyle(style)
  }
  static build(space, style) { return new DyeFab(space, style) }
  static prep(...effects) { return new DyeFab().enstyle(effects) }
  static shallow() { return { head: '', tail: '' } }
  reboot() { return this.head = '', this.tail = '', this }
  slice() { return { head: this.head ?? '', tail: this.tail ?? '' } }
  copy() { return new DyeFab().assign(this) }
  /**
   * @param {string} head
   * @param {string} tail
   */
  inject(head, tail) {
    if (head) this.head = head
    if (tail) this.tail = tail
    return this
  }
  assign(another) {
    const { head, tail } = another
    if (head) this.head = head
    if (tail) this.tail = tail
    return this
  }
  /** @param {string[]} styles */
  enstyle(styles) { return enstyle.call(this, styles) }
  setEncolor(space) { return this.encolor = selectEncolor(space), this }
  render(text) { return CSI + this.head + SGR + text + CSI + this.tail + SGR }
}