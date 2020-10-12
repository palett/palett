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
 * @param {Object} config
 * @param {PresetAndConfig|PresetAndConfig[]} [config.presets]
 * @param {string[]} [config.effects]
 */
export function fluoByColumns(mx, config) {
  const context = this
  return columnsMapper(mx, col => fluoVector.call(context, col, config))|> transpose
}
