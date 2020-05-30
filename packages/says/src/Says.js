import { hexToRgb }           from '@palett/convert'
import { PrepDye }            from '@palett/dye'
import { ITALIC }             from '@palett/enum-font-effects'
import { presetFlopper }      from '@palett/flopper'
import { Deco as DecoString } from '@spare/deco-string'
import { FUN }                from '@typen/enum-data-types'
import { mapper }             from '@vect/object-mapper'
import { Pal }                from './Pal'

export class Says {
  /** @type {Object<string,Pal|function>} */ #roster = {}
  // /** @type {Generator<{color:*}>} */ #pool = palettFlopperLite({ exhausted: false })
  /** @type {Generator<{max:*,min:*,na:*}>} */ #pool = presetFlopper({ exhausted: false })
  /** @type {Function} */ #Dye

  constructor (roster, effects) {
    if (roster) this.#roster = roster
    this.#Dye = PrepDye.apply(null, effects || [])
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get (t, p) {
        if (p in t) return typeof (p = t[p]) === FUN ? p.bind(t) : p
        if (p in t.#roster) return t.#roster[p]
        // const { value: color } = t.#pool.next()
        // return t.#roster[p] = Pal.build(p |> t.#Dye(color|> hexToRgb))
        const preset = t.#pool.next().value
        return t.#roster[p] = Pal.build(p |> DecoString({ presets: [, { preset }] }))
      }
    })
  }

  aboard (name, color) {
    if (!color) ({ value: color } = this.#pool.next())
    return this.#roster[name] = Pal.build(name |> this.#Dye(color|> hexToRgb))
  }

  roster (name) {
    if (name) return (this.#roster[name] ?? this.aboard(name)).title
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
