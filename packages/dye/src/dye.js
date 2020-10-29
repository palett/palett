import { HEX, HSL, RGB }                                                   from '@palett/enum-color-space'
import { CLR_FORE, Effects, enclose, hexToAnsi, hslToAnsi, rgbToAnsi, SC } from '@palett/util-ansi'


const assignEffects = function (effects) {
  const conf = this
  for (let effect of effects)
    if (effect in Effects && (effect = Effects[effect]))
      conf.head += SC + effect[0], conf.tail += SC + effect[1]
  return conf
}

const spaceToAnsi = space => space === RGB ? rgbToAnsi : space === HEX ? hexToAnsi : space === HSL ? hslToAnsi : rgbToAnsi


/**
 *
 * @param {string} text
 * @returns {string}
 */
export function dye(text) {
  const { head, tail } = this
  return head + text + tail
}

/***
 *
 * @param {string|number[]} color
 * @returns {function(string):string}
 */
export function Dye(color) {
  const config = this ?? {}
  let { ansi = rgbToAnsi, head = '', tail = '', effects } = config
  if (effects?.length) assignEffects.call(config, effects)
  head = enclose(head + SC + ansi(color)), tail = enclose(tail + SC + CLR_FORE)
  return dye.bind({ head, tail })
}

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
   *
   * @param space
   * @param effects
   * @returns {DyeFactory|Function}
   */
  static build(space, effects) {
    const conf = { ansi: space|> spaceToAnsi, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    return Dye.bind(conf)
  }

  static prep(space, ...effects) {
    const conf = { ansi: space|> spaceToAnsi, head: '', tail: '' }
    if (effects?.length) assignEffects.call(conf, effects)
    return Dye.bind(conf)
  }
}

/**
 *
 * @param space
 * @param effects
 * @returns {Function} return a dye, a function which takes color as argument and returns dye function
 */
export const PrepDye = (space, ...effects) => DyeFactory.build(space, effects)





