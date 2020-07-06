import { fluoVector }               from '@palett/fluo-vector'
import { columnsMapper, transpose } from '@vect/matrix'

/**
 *
 * @typedef {Object} PresetAndConfig
 * @typedef {string} PresetAndConfig.max
 * @typedef {string} PresetAndConfig.min
 * @typedef {string} PresetAndConfig.na
 * @typedef {Function} PresetAndConfig.filter
 * @typedef {Function} PresetAndConfig.mapper
 *
 * @param {*[][]} mx
 * @param {PresetAndConfig|PresetAndConfig[]} [opts]
 * @param {string[]} [effects]
 */
export function fluoByColumns(mx, opts = [], effects) {
  const context = this
  return columnsMapper(mx,
    col => fluoVector.call(context, col, opts, effects)
  )|> transpose
}
