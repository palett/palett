import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByColumns } from './fluoByColumns'
import { fluoByRows }    from './fluoByRows'
import { fluoPointwise } from './fluoPointwise'

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
export const fluoMatrix = function (mx, direct = POINTWISE, presetAndConfigs = [], effects) {
  switch (direct) {
    case ROWWISE:
      return fluoByRows.call(this, mx, presetAndConfigs, effects)
    case COLUMNWISE:
      return fluoByColumns.call(this, mx, presetAndConfigs, effects)
    case POINTWISE:
    default:
      return fluoPointwise.call(this, mx, presetAndConfigs, effects)
  }
}


