import { presetFlopper }      from '@palett/flopper'
import { Deco as DecoString } from '@spare/deco-string'
import { Callable }           from '../util/Callable'

export class Ros extends Callable {
  /** @type {Object<string,string>} */ #pool = {}
  /** @type {string[]} */ #effects = undefined

  /**
   * @param {string[]} [effects]
   * @return {Function|Ros}
   */
  constructor(effects) {
    super(text => this.aboard(text))
    this.#effects = effects
    this.flopper = presetFlopper({ exhausted: false })
  }

  get pool() { return this.#pool }

  aboard(name, preset) {
    if (name in this.pool) { return this.pool[name] }
    ({ value: preset } = preset ?? this.flopper.next())
    return this.pool[name] = name |> DecoString({ presets: preset, effects: this.#effects })
  }

  /**
   * @param {string[]} [effects]
   * @return {Function|Ros}
   */
  static build(effects) { return new Ros(effects) }
}

