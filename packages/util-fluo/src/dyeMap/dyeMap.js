import { isNumeric } from '@typen/num-strict'
import { BlendDye }  from '../dyeBlenders/blendDye'
import { hslToDye }  from '../dyeBlenders/hslToDye'

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {function(*[],function(*):*):*[]} mapper
 * @param {function} dye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */
export const dyeMap = (items, {
  mapper,
  dye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  let blendDye
  return valueLeap.dif && colorLeap.dif.some(n => !!n)
    ? (blendDye = BlendDye(valueLeap, colorLeap),
      colorant
        ? mapper(items, x => isNumeric(x) ? blendDye(x) : dye)
        : mapper(items, x => isNumeric(x) ? x |> blendDye(x) : x |> dye))
    : (blendDye = colorLeap.min |> hslToDye,
      colorant
        ? mapper(items, x => isNumeric(x) ? blendDye : dye)
        : mapper(items, x => isNumeric(x) ? x |> blendDye : x |> dye))
}








