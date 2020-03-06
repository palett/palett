import { hexToRgb } from '@palett/convert'
import { PrepDye } from '@palett/dye'
import { palettFlopper } from '@palett/flopper'
import { ITALIC } from '@palett/enum-font-effects'
import { mapper } from '@vect/object-mapper'
import { FUN } from '@typen/enums'
import { Pal } from './Pal'

export class Says {
  /** @type {Object<string,Pal|function>} */ #roster = {}
  /** @type {Generator<{color:*}>} */ #pool = palettFlopper({ exhausted: false })
  /** @type {Function} */ #Dye

  constructor (roster, effects) {
    if (roster) this.#roster = roster
    this.#Dye = PrepDye.apply(null, effects || [])
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get (tar, p) {
        if (p in tar) return typeof (p = tar[p]) === FUN ? p.bind(tar) : p
        if (p in tar.#roster) return tar.#roster[p]
        const { value: { color } } = tar.#pool.next()
        return tar.#roster[p] = Pal.build(p |> tar.#Dye(color|> hexToRgb))
      }
    })
  }

  aboard (name, color) {
    if (!color) ({ value: { color } } = this.#pool.next())
    return this.#roster[name] = Pal.build(name |> this.#Dye(color|> hexToRgb))
  }

  roster (name) {
    if (name) return this.#roster[name]?.title
    return mapper(this.#roster, ({ title }) => title)
  }

  /**
   *
   * @param roster
   * @param effects
   * @returns {Says|Object<string,function>}
   */
  static build ({ roster, effects = [ITALIC] } = {}) { return new Says(roster, effects) }
}
