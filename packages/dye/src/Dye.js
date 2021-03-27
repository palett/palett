import { oneself }                                   from '@ject/oneself'
import { CLR_FORE, Effects, enclose, rgbToAnsi, SC } from '@palett/util-ansi'

export const assignEffects = function (effects) {
  const conf = this
  for (let effect of effects)
    if (effect in Effects && (effect = Effects[effect]))
      conf.head += SC + effect[0], conf.tail += SC + effect[1]
  return conf
}

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
  if (!color) return oneself
  const config = this ?? {}
  let { ansi = rgbToAnsi, head = '', tail = '', effects } = config
  if (effects?.length) assignEffects.call(config, effects)
  head = enclose(head + SC + ansi(color)), tail = enclose(tail + SC + CLR_FORE)
  return dye.bind({ head, tail })
}







