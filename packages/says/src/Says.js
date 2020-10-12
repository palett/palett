import { ITALIC }             from '@palett/enum-font-effects'
import { presetFlopper }      from '@palett/flopper'
import { Deco as DecoString } from '@spare/deco-string'
import { FUN }                from '@typen/enum-data-types'
import { mapper }             from '@vect/object-mapper'
import { Pal }                from './Pal'

const pal = (name, conf) => Pal.build(name |> DecoString(conf))

export class Says {
  /** @type {Object<string,Pal|function>} */ #roster = {}
  /** @type {Generator<{max:*,min:*,na:*}>} */ #pool = presetFlopper({ exhausted: false })
  /** @type {string[]!} */ #effects = undefined

  constructor(roster, effects) {
    if (roster) this.#roster = roster
    this.#effects = effects
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get(t, p) {
        if (p in t) return typeof (p = t[p]) === FUN ? p.bind(t) : p
        if (p in t.#roster) return t.#roster[p]
        return t.aboard(p, t.#pool.next().value)
      }
    })
  }

  aboard(name, preset) {
    if (!preset) ({ value: preset } = this.#pool.next())
    return this.#roster[name] = pal(String(name), preset, this.#effects)
  }

  roster(name) {
    if (name) return (this.#roster[name] ?? this.aboard(name)).name
    return mapper(this.#roster, ({ title }) => title)
  }

  /**
   *
   * @param roster
   * @param effects
   * @returns {Says|Object<string,function>}
   */
  static build({ roster, effects = [ITALIC] } = {}) { return new Says(roster, effects) }
}
