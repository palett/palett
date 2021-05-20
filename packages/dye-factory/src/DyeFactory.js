import { assignEffects, assignHex, assignHsl, assignInt, assignRgb, Dye } from '@palett/dye'
import { HEX, HSL, INT, RGB }                                             from '@palett/enum-color-space'


/** @type {Function} */
export class DyeFactory {
  /** @type {Function} */ ansi
  /** @type {string} */ head
  /** @type {string} */ tail

  /**
   *
   * @param {Function} ansi
   * @param {string} head
   * @param {string} tail
   * @returns {Dye|Function}
   */
  constructor(ansi, head, tail) {
    this.ansi = ansi
    this.head = head
    this.tail = tail
    return Dye.bind(this)
  }

  /**
   * @param {string} colorSpace
   * @param {string[]} effects
   * @returns {Dye|Function}
   */
  static build(colorSpace, effects) {
    const conf = { ansi: colorSpace|> assignerSelector, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    // console.log(conf)
    return Dye.bind(conf)
  }

  /**
   * @param {string} colorSpace
   * @param {...string} effects
   * @returns {Dye|Function}
   */
  static prep(colorSpace, ...effects) {
    return DyeFactory.build(colorSpace, effects)
  }
}

const assignerSelector = space =>
  space === RGB ? assignRgb :
    space === HEX ? assignHex :
      space === HSL ? assignHsl :
        space === INT ? assignInt :
          assignRgb

