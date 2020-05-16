import { hexToRgb }          from '@palett/convert'
import { Dye }               from '@palett/dye'
import { palettFlopperLite } from '@palett/flopper'
import { Callable }          from '../util/Callable'

export class Ros extends Callable {
  /** @type {Object<string,Pal|function>} */ #pool = {}

  /** @return {Function|Ros} */
  constructor () {
    super(text => this.aboard(text))
    this.flopper = palettFlopperLite({ exhausted: false })
  }

  get pool () { return this.#pool }

  aboard (name, color) {
    if (name in this.pool) { return this.pool[name] }
    color = color ?? this.flopper.next().value
    return this.pool[name] = name|> Dye(color|> hexToRgb)
  }

  /** @return {Function|Ros} */
  static build () { return new Ros() }
}

