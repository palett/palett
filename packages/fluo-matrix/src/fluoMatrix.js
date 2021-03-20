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
 * @param {Object} config
 * @param {number} [direct=POINTWISE]
 * @param {FluoSetting[]} [config.presets]
 */
export const fluoMatrix = function (mx, direct, config) {
  switch (config.direct) {
    case ROWWISE:
      return fluoByRows.call(this, mx, config)
    case COLUMNWISE:
      return fluoByColumns.call(this, mx, config)
    case POINTWISE:
    default:
      return fluoPointwise.call(this, mx, config)
  }
}



