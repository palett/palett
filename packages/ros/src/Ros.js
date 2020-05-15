import { VectorCollection }  from '@foba/vector-string'
import { hexToRgb }          from '@palett/convert'
import { Dye }               from '@palett/dye'
import { palettFlopperLite } from '@palett/flopper'
import { delogger }          from '@spare/deco'
import { Callable }          from '../util/Callable'

const enlist = function (thing) {
  const { pool, flopper } = this
  if (thing in pool) { return pool[thing] }
  const color = flopper.next().value
  return pool[thing] = thing|> Dye(color|> hexToRgb)
}

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

