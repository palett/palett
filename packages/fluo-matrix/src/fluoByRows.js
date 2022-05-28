import { fluoVector }                               from '@palett/fluo-vector'
import { mapper as mapVector, mutate as mutVector } from '@vect/vector-mapper'


/**
 *
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.by
 * @typedef {Function} Preset.to
 *
 * @param {*[][]} mx
 * @param {Preset[]} [config]
 * @returns {*[][]}
 */
export function fluoByRows(mx, config) {
  const
    context = this,
    mapper = context?.mutate ? mutVector : mapVector
  return mapper(mx, row => fluoVector.call(context, row, config))
}
