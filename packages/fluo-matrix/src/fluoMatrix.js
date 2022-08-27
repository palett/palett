import { arrToPres, Fluo }                from '@palett/fluo'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByColumns }                  from './fluoByColumns.js'
import { fluoByPoints }                   from './fluoByPoints.js'
import { fluoByRows }                     from './fluoByRows.js'

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
export const fluoMatrix = function (matrix, direct, pres) {
  if (!matrix?.length || !pres) return matrix
  switch (direct) {
    case ROWWISE:
      return fluoByRows.call(this, matrix, pres)
    case COLUMNWISE:
      return fluoByColumns.call(this, matrix, pres)
    case POINTWISE:
    default:
      return fluoByPoints.call(this, matrix, pres)
  }
}

export const fluoMatrix2 = function (matrix, direct, pres, width) {
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



