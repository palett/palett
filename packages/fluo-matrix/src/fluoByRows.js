import { fluoVector }                               from '@palett/fluo-vector'
import { mapper as mapVector, mutate as mutVector } from '@vect/vector-mapper'


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
export function fluoByRows(mx, config) {
  const
    context = this,
    mapper = context?.mutate ? mutVector : mapVector
  return mapper(mx, row => fluoVector.call(context, row, config))
}
