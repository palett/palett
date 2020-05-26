import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByCol }                      from './fluoByCol'
import { fluoByRow }                      from './fluoByRow'
import { fluoMat }                        from './fluoMat'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param {*[][]} mx
 * @param {number} [direct=POINTWISE]
 * @param {PalettProjectConfig} [x]
 * @param {PalettProjectConfig} [y]
 */
export const fluo = function (mx, direct = POINTWISE, x = {}, y = {}) {
  const config = this ?? {}
  switch (direct) {
    case ROWWISE:
      return fluoByRow.call(config, mx, direct, x, y)
    case COLUMNWISE:
      return fluoByCol.call(config, mx, direct, x, y)
    case POINTWISE:
    default:
      return fluoMat.call(config, mx, direct, x, y)
  }
}



