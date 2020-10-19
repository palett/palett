import { bracket, parenth } from '@spare/bracket'
import { SP }               from '@spare/enum-chars'
import { FUN, STR }         from '@typen/enum-data-types'
import { Callable }         from '../util/Callable'
import { narrate }          from './narrate'

/** @type {function} */
export class Pal extends Callable {
  /** @type {string}   */ name = ''
  /** @type {string}   */ des = ''
  /** @type {number}   */ ind = 0
  /** @type {Function} */ log = console.log
  /** @type {Function} */ att = void 0
  constructor(name, { indent = 0, logger, attach } = {}) {
    super(text => narrate(text, this))
    if (name) this.name = name
    if (indent) this.ind = indent
    if (logger) this.log = logger
    if (attach) this.attach(attach)
  }

  p(words) { return this.des += SP + words, this }
  br(words) { return this.des += SP + parenth(words), this }
  to(someone) {
    if (someone instanceof Pal) someone = someone.name
    this.des += ' -> ' + bracket(someone)
    return this
  }

  attach(func) {
    if (typeof func === FUN) { this.att = func }
    return this
  }
  detach() { return this.att = null, this }

  level(logger) {
    if (typeof logger === STR && logger in console) { return this.log = console[logger], this }
    if (typeof logger === FUN) { return this.log = logger, this }
    return this
  }

  get asc() { return this.ind++, this }

  get desc() { return (this.ind && this.ind--), this }

  /**
   * @param {string} title
   * @param {Object} [options]
   * @returns {Pal|function}
   */
  static build(title, options) { return new Pal(title, options) }
}
