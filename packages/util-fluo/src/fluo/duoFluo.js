import { isNumeric }    from '@typen/num-strict'
import { BlendDye }     from '../dyeBlenders/blendDye'
import { hslToDye }     from '../dyeBlenders/hslToDye'
import { dyeMap }       from '../dyeMap/dyeMap'
import { duoDyeZip }    from '../dyeZip/duoDyeZip'
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
  bound,
  preset,
  colorant = false
} = {}) => {
  const leap = bound(values, BOUND_CONF)
  const dye = preset |> presetToFlat
  const xLeap = preset|> presetToLeap
  const yLeap = preset|> presetToLeap
  const xDif = xLeap.dif.some(n => n)
  const yDif = yLeap.dif.some(n => n)
  if (!leap.dif && xDif && yDif) {
    const someDye = hslToDye(xLeap.min)
    return mapper(values, v => isNumeric(v) ? someDye : dye)
  }
  if (xDif && !yDif) {
    const xDye = BlendDye(leap, xLeap)
    return mapper(values, v => isNumeric(v) ? xDye(v) : dye)
  }
  if (!xDif && yDif) {
    const yDye = BlendDye(leap, yLeap)
    return mapper(values, v => isNumeric(v) ? yDye(v) : dye)
  }
  if (xDif && yDif) {
    const xDye = BlendDye(leap, xLeap)
    const yDye = BlendDye(leap, yLeap)
    return mapper(values, v => isNumeric(v) ? v >= 0 ? xDye(v) : yDye(v) : dye)
  }
}
