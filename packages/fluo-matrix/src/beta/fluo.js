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
 * @param {PalettProjectConfig[]} [presets]
 * @param {string[]} [effects]
 */
export const fluo = function (mx, direct = POINTWISE, presets = [], effects) {
  switch (direct) {
    case ROWWISE:
      return fluoByRow.call(this, mx, presets, effects)
    case COLUMNWISE:
      return fluoByCol.call(this, mx, presets, effects)
    case POINTWISE:
    default:
      return fluoMat.call(this, mx, presets, effects)
  }
}



