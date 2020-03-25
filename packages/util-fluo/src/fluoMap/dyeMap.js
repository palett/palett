import { isNumeric } from '@typen/num-strict'
import { BlendDye } from '../dyeBlenders/blendDye'
import { hslToDye } from '../dyeBlenders/hslToDye'

/**
 *
 * @param {*[]} vec
 * @param {*[]} values
 * @param {function(*[],function(*):*):*[]} mapper
 * @param {function} primeDye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */
export const dyeMap = (vec, {
  mapper,
  primeDye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  let blendDye
  return valueLeap.dif && colorLeap.dif.some(n => !!n)
    ? (blendDye = BlendDye(valueLeap, colorLeap),
      colorant
        ? mapper(vec, x => isNumeric(x) ? blendDye(x) : primeDye)
        : mapper(vec, x => isNumeric(x) ? x |> blendDye(x) : x |> primeDye))
    : (blendDye = colorLeap.min |> hslToDye,
      colorant
        ? mapper(vec, x => isNumeric(x) ? blendDye : primeDye)
        : mapper(vec, x => isNumeric(x) ? x |> blendDye : x |> primeDye))
}








