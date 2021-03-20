import { fluoVector }               from '@palett/fluo-vector'
import { columnsMapper, transpose } from '@vect/matrix'


/**
 *
 * @typedef {Object} FluoSetting
 * @typedef {{min:string,max:string,na:string}} FluoSetting.preset
 * @typedef {string[]} FluoSetting.effects
 * @typedef {Function} FluoSetting.filter
 * @typedef {Function} FluoSetting.mapper
 *
 * @param {*[][]} mx
 * @param {FluoSetting[]} [config]
 * @returns {*[][]}
 */
export function fluoByColumns(mx, config) {
  const context = this
  return columnsMapper(mx, col => fluoVector.call(context, col, config))|> transpose
}
