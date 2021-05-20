import { CSI, SGR }                from '@palett/enum-ansi-codes'
import { assignForeColorSelector } from './assignColor'
import { assignStyle }             from './assignStyle'

export class Panel {
  head = ''
  tail = ''
  constructor() {}
  static build() { return new Panel() }
  static prep(...effects) { return new Panel().assignStyle(effects) }
  init() { return this.head = '', this.tail = '', this }
  slice() { return { head: this.head, tail: this.tail } }
  copy() { return new Panel().inject(this.head, this.tail) }
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
  assignStyle(styles) { return assignStyle.call(this, styles) }
  setColorSpace(space) { return this.assignColor = assignForeColorSelector(space), this }
  render(text) { return CSI + this.head + SGR + text + CSI + this.tail + SGR }
}