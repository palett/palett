import { dyeZip } from './dyeZip'
import { presetToFlatDye } from '../presetReader/presetToFlatDye'
import { presetToLeap } from '../presetReader/presetToLeap'
import { STAT_BOUND_CONFIG } from '../../resources/statBoundConfig'

/**
 *
 * @param {*[]} keys
 * @param {*[]} values
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*[],{dif:boolean,level:number}):{min:number,dif:number}} bound
 * @param {{max:string,min:string,na:string}} preset
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
