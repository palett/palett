import { PalettSelector } from '@palett/table'
import { hexToRgb } from '@palett/convert'
import { Dye } from '@palett/dye'
import { mapper } from '@vect/object-mapper'
import { FUN } from '@typen/enums'
import { Pal } from './Pal'

export class Says {
  /** @type {Object<string,Pal|function>} */ #roster = {}
  /** @type {Set<string>} */ #colorPool = new Set()
  /** @type {Object<string,string>} */ #keywords = {}

  constructor (roster, keywords) {
    if (roster) this.#roster = roster
    if (keywords) this.#keywords = keywords
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get (target, p, receiver) {
        if (p in target) return typeof (p = target[p]) === FUN ? p.bind(target) : p
        if (p in target.#roster) return target.#roster[p]
        let hex, n = 0
        do {
          ({ hex } = PalettSelector.random())
        } while (++n <= PalettSelector.pool && target.#colorPool.has(hex))
        target.#colorPool.add(hex)
        return target.#roster[p] = Pal.build(p |> Dye(hex |> hexToRgb), { keywords: target.#keywords })
      }
    })
  }

  aboard (name, hex) {
    this.#colorPool.add(hex)
    return this.#roster[name] = Pal.build(name |> Dye(hex |> hexToRgb), { keywords: this.#keywords })
  }

  get roster () { return mapper(this.#roster, ({ title }) => title) }
  get colorPool () { return this.#colorPool }

  /**
   *
   * @param roster
   * @param keywords
   * @returns {Says|Object<string,function>}
   */
  static build ({ roster, keywords }) { return new Says(roster, keywords) }
}
