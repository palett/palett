import { isNumeric } from '@typen/num-strict'
import { dyeMap }    from '../dyeMap/dyeMap'
import { BlendDye }  from '../dyeBlenders/blendDye'
import { hslToDye }  from '../dyeBlenders/hslToDye'

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*):string} dye
 * @param {{dif:number,min:number}} valueLeap
 * @param {{dif:number[],min:number[]}} colorLeap
 * @param {boolean} colorant
 * @returns {function[]|*[]}
 */
export const dyeZip = (items, {
  values,
  zipper,
  dye,
  valueLeap,
  colorLeap,
  colorant
}) => {
  let blendDye
  const fn = valueLeap.dif && colorLeap.dif.some(n => !!n)
    ? (blendDye = BlendDye(valueLeap, colorLeap),
      colorant
        ? (x, v) => isNumeric(v) ? blendDye(v) : dye
        : (x, v) => isNumeric(v) ? x |> blendDye(v) : x |> dye)
    : (blendDye = colorLeap.min |> hslToDye,
      colorant
        ? (x, v) => isNumeric(v) ? blendDye : dye
        : (x, v) => isNumeric(v) ? x |> blendDye : x |> dye)
  return zipper(items, values, fn)
}
