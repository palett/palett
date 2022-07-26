import { arrToPres, Fluo }                from '@palett/fluo'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'

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
 * @param {*[][]} matrix
 * @param {number} [direct=POINTWISE]
 * @param {Preset[]} [pres]
 * @param {number} [width]
 */
export const fluoMatrix = function (matrix, direct, pres, width) {
  if (!matrix?.length || !pres) return matrix
  if (Array.isArray(pres)) pres = arrToPres(pres)
  const mode = this?.colorant, mutate = this?.mutate
  switch (direct) {
    case ROWWISE:
      return Fluo.rows(matrix, pres, mutate, mode)
    case COLUMNWISE:
      return Fluo.columns(matrix, pres, mutate, mode)
    case POINTWISE:
    default:
      return Fluo.matrix(matrix, pres, width, mutate, mode)
  }
}



