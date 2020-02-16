import { dyeMap } from '../fluoMap/dyeMap'
import { isNumeric } from '../typeCheckers/isNumeric'
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
  return valueLeap.dif && colorLeap.dif.some(n => !!n)
    ? (blendDye = BlendDye(valueLeap, colorLeap),
      colorant
        ? mapper(keys, (x, v) => isNumeric(v) ? blendDye(v) : primeDye)
        : zipper(keys, values, (x, v) => isNumeric(v) ? x |> blendDye(v) : x |> primeDye))
    : (blendDye = colorLeap.min |> hslToDye,
      colorant
        ? mapper(keys, (x, v) => isNumeric(v) ? blendDye : primeDye)
        : zipper(keys, values, (x, v) => isNumeric(v) ? x |> blendDye : x |> primeDye))
}
