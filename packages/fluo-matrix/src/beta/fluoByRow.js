import { fluoVector }                               from '@palett/fluo-vector'
import { mapper as mapVector, mutate as mutVector } from '@vect/vector'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param {*[][]} mx
 * @param {PalettProjectConfig} x
 * @param {PalettProjectConfig} y
 */
export const fluoByRow = (mx, x = {}, y = {}) => {
  const config = this ?? {}
  const { mutate } = config
  const mapper = mutate ? mutVector : mapVector
  return mapper(mx, row => fluoVector.call(config, row, x, y))
}