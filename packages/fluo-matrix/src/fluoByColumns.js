import { fluoVector }               from '@palett/fluo-vector'
import { columnsMapper, transpose } from '@vect/matrix'


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
 * @param {*[][]} mx
 * @param {Preset[]} [config]
 * @returns {*[][]}
 */
export function fluoByColumns(mx, config) {
  const context = this
  return columnsMapper(mx, col => fluoVector.call(context, col, config))|> transpose
}
