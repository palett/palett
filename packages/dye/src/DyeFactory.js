import { HEX, HSL, RGB }                   from '@palett/enum-color-space'
import { hexToAnsi, hslToAnsi, rgbToAnsi } from '@palett/util-ansi'
import { assignEffects, Dye }              from './Dye'

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
    const conf = { ansi: colorSpace|> spaceToAnsi, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    return Dye.bind(conf)
  }
  static prep(colorSpace, ...effects) {
    const conf = { ansi: colorSpace|> spaceToAnsi, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    return Dye.bind(conf)
  }
}

