import { HEX, HSL, RGB }                   from '@palett/enum-color-space'
import { hexToAnsi, hslToAnsi, rgbToAnsi } from '@palett/util-ansi'
import { assignEffects, Dye }              from '@palett/dye'

const spaceToAnsi = space =>
  space === RGB ? rgbToAnsi :
    space === HEX ? hexToAnsi :
      space === HSL ? hslToAnsi :
        rgbToAnsi


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
    const conf = { ansi: colorSpace|> spaceToAnsi, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
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

