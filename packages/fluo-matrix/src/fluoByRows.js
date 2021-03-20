import { fluoVector }                               from '@palett/fluo-vector'
import { mapper as mapVector, mutate as mutVector } from '@vect/vector-mapper'


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
export function fluoByRows(mx, config) {
  const
    context = this,
    mapper = context?.mutate ? mutVector : mapVector
  return mapper(mx, row => fluoVector.call(context, row, config))
}
