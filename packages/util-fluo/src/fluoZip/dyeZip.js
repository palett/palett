import { isNumeric } from '@typen/num-strict'
import { dyeMap } from '../fluoMap/dyeMap'
import { BlendDye } from '../dyeBlenders/blendDye'
import { hslToDye } from '../dyeBlenders/hslToDye'

/**
 *
 * @param {*[]} keys
 * @param {*[]} values
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*):string} primeDye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */
export const dyeZip = (keys, {
  values,
  mapper,
  zipper,
  primeDye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  if (!values) return dyeMap(keys, { mapper, primeDye, valueLeap, colorLeap, colorant })
  let blendDye
  const fn = valueLeap.dif && colorLeap.dif.some(n => !!n)
    ? (blendDye = BlendDye(valueLeap, colorLeap),
      colorant
        ? (x, v) => isNumeric(v) ? blendDye(v) : primeDye
        : (x, v) => isNumeric(v) ? x |> blendDye(v) : x |> primeDye)
    : (blendDye = colorLeap.min |> hslToDye,
      colorant
        ? (x, v) => isNumeric(v) ? blendDye : primeDye
        : (x, v) => isNumeric(v) ? x |> blendDye : x |> primeDye)
  return zipper(keys, values, fn)
}
