import { fluoVector }               from '@palett/fluo-vector'
import { columnsMapper, transpose } from '@vect/matrix'

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
export const fluoByCol = (mx, x = {}, y = {}) => {
  const config = this ?? {}
  return columnsMapper(mx, col => fluoVector.call(config, col, x, y))
    |> transpose
}
