import { bracket, parenth } from '@spare/bracket'
import { SP }               from '@spare/enum-chars'
import { FUN, STR }         from '@typen/enum-data-types'
import { Callable }         from '../util/Callable'
import { narrate }          from './narrate'

/** @type {function} */
export class Pal extends Callable {
  /** @type {string} */ title = ''
  /** @type {string} */ des = ''
  /** @type {number} */ indent = 0
  /** @type {Function} */ logger = console.log
  constructor(title, { indent = 0, logger } = {}) {
    super(text => narrate(text, this))
    if (title) this.title = title
    if (indent) this.indent = indent
    if (logger) this.logger = logger
  }

  p(words) { return this.des += SP + words, this }

  br(words) { return this.des += SP + parenth(words), this }

  to(someone) {
    if (someone instanceof Pal) someone = someone.title
    this.des += ' -> ' + bracket(someone)
    return this
  }

  setLogger(newLogger) {
    if (typeof newLogger === STR && newLogger in console) { return this.logger = console[newLogger], this }
    if (typeof newLogger === FUN) { return this.logger = newLogger, this }
    return this
  }

  get asc() { return this.indent++, this }

  get desc() { return (this.indent && this.indent--), this }

  /**
   * @param {string} title
   * @param {Object} [options]
   * @returns {Pal|function}
   */
  static build(title, options) { return new Pal(title, options) }
}
