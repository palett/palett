import { fluoVec }                                  from '@palett/fluo-vector'
import { mapper as mapVector, mutate as mutVector } from '@vect/vector'

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
export function fluoByRow(mx, presetAndConfigs = [], effects) {
  const
    context = this,
    mapper = context?.mutate ? mutVector : mapVector
  return mapper(mx, row => fluoVec.call(context, row, presetAndConfigs, effects))
}
