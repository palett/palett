import { dyeZip }            from './dyeZip'
import { presetToFlatDye }   from '../presetReader/presetToFlatDye'
import { presetToLeap }      from '../presetReader/presetToLeap'
import { STAT_BOUND_CONFIG } from '../../resources/statBoundConfig'

/**
 *
 * @param {*[]} keys
 * @param {*[]} values
 * @param {Function|function(*[],function(*)):*[]} mapper
 * @param {Function|function(*[],*[],function(*,*)):*[]} zipper
 * @param {Function|function(*[],{dif:boolean,level:number}):{min:number,dif:number}} bound
 * @param {Object} preset
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */
export const fluoZip = (keys, {
  values,
  mapper,
  zipper,
  bound,
  preset,
  colorant = false
} = {}) => {
  return dyeZip(keys, {
    values,
    mapper,
    zipper,
    primeDye: preset |> presetToFlatDye,
    colorLeap: preset |> presetToLeap,
    valueLeap: bound(values || keys, STAT_BOUND_CONFIG),
    colorant
  })
}
