import { logger } from './logger'
import { Callable } from '../util/Callable'

/** @type {function} */
export class Pal extends Callable {
  /** @type {string} */ title = ''
  /** @type {number} */ indent = 0

  constructor (title, { indent = 0 } = {}) {
    super(text => logger(text, this))
    if (title) this.title = title
    if (indent) this.indent = indent
  }

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
