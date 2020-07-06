import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByCol }                      from './fluoByCol'
import { fluoByRow }                      from './fluoByRow'
import { fluoMat }                        from './fluoMat'

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
 * @param {number} [direct=POINTWISE]
 * @param {PresetAndConfig[]} [presetAndConfigs]
 * @param {string[]} [effects]
 */
export const fluo = function (mx, direct = POINTWISE, presetAndConfigs = [], effects) {
  switch (direct) {
    case ROWWISE:
      return fluoByRow.call(this, mx, presetAndConfigs, effects)
    case COLUMNWISE:
      return fluoByCol.call(this, mx, presetAndConfigs, effects)
    case POINTWISE:
    default:
      return fluoMat.call(this, mx, presetAndConfigs, effects)
  }
}



