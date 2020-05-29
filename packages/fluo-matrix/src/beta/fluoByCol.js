import { fluoVec }                  from '@palett/fluo-vector'
import { columnsMapper, transpose } from '@vect/matrix'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param {*[][]} mx
 * @param {PalettProjectConfig[]} [presets]
 */
export function fluoByCol (mx, presets = []) {
  const config = this
  return columnsMapper(mx,
    col => fluoVec.call(config, col, presets)
  )|> transpose
}
