import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoByColumns }                  from './fluoByColumns'
import { fluoByRows }                     from './fluoByRows'
import { fluoPointwise }                  from './fluoPointwise'


/**
 *
 * @typedef {Object} FluoSetting
 * @typedef {{min:string,max:string,na:string}} FluoSetting.preset
 * @typedef {string[]} FluoSetting.effects
 * @typedef {Function} FluoSetting.filter
 * @typedef {Function} FluoSetting.mapper
 *
 * @param {*[][]} mx
 * @param {number} [direct=POINTWISE]
 * @param {FluoSetting[]} [configs]
 */
export const fluoMatrix = function (mx, direct, configs) {
  switch (direct) {
    case ROWWISE:
      return fluoByRows.call(this, mx, configs)
    case COLUMNWISE:
      return fluoByColumns.call(this, mx, configs)
    case POINTWISE:
    default:
      return fluoPointwise.call(this, mx, configs)
  }
}



