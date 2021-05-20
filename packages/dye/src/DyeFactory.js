import { HEX, HSL, INT, RGB }                         from '@palett/enum-color-space'
import { assignHex, assignHsl, assignInt, assignRgb } from './assignColor'
import { assignEffects }                              from './assignEffects'
import { Dye }                                        from './Dye'


/** @type {Function} */
export class DyeFactory {
  /** @type {Function} */ ansi
  /** @type {string} */ head
  /** @type {string} */ tail
  constructor(ansi, head, tail) {
    this.ansi = ansi
    this.head = head
    this.tail = tail
    return Dye.bind(this)
  }
  /**
   * @param colorSpace
   * @param effects
   * @returns {DyeFactory|Function}
   */
  static build(colorSpace, effects) {
    const conf = { ansi: colorSpace|> assignerSelector, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    return Dye.bind(conf)
  }
  static prep(colorSpace, ...effects) {
    const conf = { ansi: colorSpace|> assignerSelector, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    return Dye.bind(conf)
  }
}

const assignerSelector = space =>
  space === RGB ? assignRgb :
    space === HEX ? assignHex :
      space === HSL ? assignHsl :
        space === INT ? assignInt :
          assignRgb

