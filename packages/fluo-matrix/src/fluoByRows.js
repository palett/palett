import { fluoVector }     from '@palett/fluo-vector'
import { mapper, mutate } from '@vect/vector-mapper'


/**
 *
 * @typedef {Object|Preset} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.by
 * @typedef {Function} Preset.to
 *
 * @param {*[][]} rows
 * @param {Preset[]} [config]
 * @returns {*[][]}
 */
export function fluoByRows(rows, config) {
  const ctx = this, to = ctx?.mutate ? mutate : mapper
  return to(rows, row => fluoVector.call(ctx, row, config))
}
