import { Hatsu } from '@palett/hatsu'
import { PalettSelector as PalSel } from '@palett/table'
import { Pal } from './Pal'
import { Ob } from 'veho'

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
        if (p in target) return typeof (p = target[p]) === 'function' ? p.bind(target) : p
        if (p in target.#roster) return target.#roster[p]
        let hex, n = 0
        do {
          ({ hex } = PalSel.random())
        } while (++n <= PalSel.pool && target.#colorPool.has(hex))
        target.#colorPool.add(hex)
        return target.#roster[p] = Pal.build(p |> Hatsu.hex(hex), { keywords: target.#keywords })
      }
    })
  }

  aboard (name, hex) {
    this.#colorPool.add(hex)
    return this.#roster[name] = Pal.build(name |> Hatsu.hex(hex), { keywords: this.#keywords })
  }

  get roster () {
    return Ob.mapValues(this.#roster, pal => pal.title)
  }

  get colorPool () {
    return this.#colorPool
  }

  /**
   *
   * @param roster
   * @param keywords
   * @returns {Says|Object<string,function>}
   */
  static build ({ roster, keywords }) {
    return new Says(roster, keywords)
  }
}
