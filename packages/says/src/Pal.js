import { render } from './helpers'
import { Callable } from '../util/Callable'

/**
 * @type {class|function}
 */
export class Pal extends Callable {
  /** @type {string} */ title = ''
  /** @type {number} */ indent = 0
  /** @type {Object<string,string>} */ keywords = {}

  constructor (title, { indent = 0, keywords } = {}) {
    super(tx => render(tx, this))
    if (title) this.title = title
    if (indent) this.indent = indent
    if (keywords) this.keywords = keywords
  }

  /**
   *
   * @param title
   * @param indent
   * @param keywords
   * @returns {Pal|function}
   */
  static build (title, { indent = 0, keywords } = {}) {
    return new Pal(title, { indent, keywords })
  }

  get asc () {
    this.indent++
    return this
  }

  get desc () {
    this.indent--
    return this
  }
}
