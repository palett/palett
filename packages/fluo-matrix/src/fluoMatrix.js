import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByColumns }                  from './fluoByColumns'
import { fluoByRows }                     from './fluoByRows'
import { fluoByPoints }                   from './fluoByPoints'


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
 * @param {*[][]} mx
 * @param {number} [direct=POINTWISE]
 * @param {Preset[]} [configs]
 */
export const fluoMatrix = function (mx, direct, configs) {
  switch (direct) {
    case ROWWISE:
      return fluoByRows.call(this, mx, configs)
    case COLUMNWISE:
      return fluoByColumns.call(this, mx, configs)
    case POINTWISE:
    default:
      return fluoByPoints.call(this, mx, configs)
  }
}



