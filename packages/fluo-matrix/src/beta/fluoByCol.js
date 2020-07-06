import { fluoVec }                  from '@palett/fluo-vector'
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
 * @param {PresetAndConfig[]} [presetAndConfigs]
 * @param {string[]} [effects]
 */
export function fluoByCol(mx, presetAndConfigs = [], effects) {
  const context = this
  return columnsMapper(mx,
    col => fluoVec.call(context, col, presetAndConfigs, effects)
  )|> transpose
}
