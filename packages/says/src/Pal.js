import { narrate } from './narrate'
import { Callable } from '../util/Callable'

/** @type {function} */
export class Pal extends Callable {
  /** @type {string} */ title = ''
  /** @type {string} */ des = ''
  /** @type {number} */ indent = 0

  constructor (title, { indent = 0 } = {}) {
    super(text => narrate(text, this))
    if (title) this.title = title
    if (indent) this.indent = indent
  }

  p (words) { return this.des += ' ' + words, this }
  br (words) { return this.des += ' (' + words + ')', this }
  get asc () { return this.indent++, this }
  get desc () { return (this.indent && this.indent--), this }

  /**
   * @param title
   * @param indent
   * @returns {Pal|function}
   */
  static build (title, { indent = 0 } = {}) {
    return new Pal(title, { indent })
  }
}
