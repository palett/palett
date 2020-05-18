import { dyeMap }       from '../dyeMap/dyeMap'
import { dyeZip }       from '../dyeZip/dyeZip'
import { presetToFlat } from '../presetReader/presetToFlat'
import { presetToLeap } from '../presetReader/presetToLeap'
import { BOUND_CONF }   from '../../resources/statBoundConfig'

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {Function|function(*[],function(*)):*[]} mapper
 * @param {Function|function(*[],*[],function(*,*)):*[]} zipper
 * @param {Function|function(*[],{dif:boolean,level:number}):{min:number,dif:number}} bound
 * @param {Object} preset
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */
export const fluo = (items, {
  values,
  mapper,
  zipper,
  bound,
  preset,
  colorant = false
} = {}) => {
  if (!values) return dyeMap(items, {
    mapper,
    dye: preset |> presetToFlat,
    colorLeap: preset |> presetToLeap,
    valueLeap: bound(items, BOUND_CONF),
    colorant
  })
  return dyeZip(items, {
    values,
    mapper,
    zipper,
    dye: preset |> presetToFlat,
    colorLeap: preset |> presetToLeap,
    valueLeap: bound(values, BOUND_CONF),
    colorant
  })
}
