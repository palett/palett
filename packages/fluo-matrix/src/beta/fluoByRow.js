import { fluoVec }                                  from '@palett/fluo-vector'
import { mapper as mapVector, mutate as mutVector } from '@vect/vector'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param {*[][]} mx
 * @param {PalettProjectConfig[]} [presets]
 * @param {string[]} [effects]
 */
export function fluoByRow (mx, presets = [], effects) {
  const
    config = this,
    { mutate } = config,
    mapper = mutate ? mutVector : mapVector
  return mapper(mx, row => fluoVec.call(config, row, presets, effects))
}
