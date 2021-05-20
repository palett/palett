import { Panel } from '../util/panel'
import { Dye }   from './dye'


/** @type {Function} */
export class DyeFactory extends Panel {
  /** @type {Function} */ ansi
  /** @type {string} */ head
  /** @type {string} */ tail
  constructor(ansi, head, tail) {
    super()
    this.inject(head, tail)
    this.ansi = ansi
    return Dye.bind(this)
  }
  /**
   * @param colorSpace
   * @param effects
   * @returns {DyeFactory|Function}
   */
  static build(colorSpace, effects) {
    const panel = Panel.build().setColorSpace(colorSpace).assignStyle(effects)
    return Dye.bind(panel)
  }
  static prep(colorSpace, ...effects) {
    const panel = Panel.build().setColorSpace(colorSpace).assignStyle(effects)
    return Dye.bind(panel)
  }
}

