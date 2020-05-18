import { isNumeric } from '@typen/num-strict'
import { BlendDye }  from '../dyeBlenders/blendDye'
import { hslToDye }  from '../dyeBlenders/hslToDye'

/**
 *
 * @param {*[]} values
 * @param xLeap
 * @param yLeap
 * @param {function(*[],function(*)):*[]} mapper
 * @param {function(*[],*[],function(*,*)):*[]} zipper
 * @param {function(*):string} dye
 * @param {{dif:number,min:number}} leap
 * @param {{dif:number[],min:number[]}} leap
 * @returns {function[]|*[]}
 */
export const duoDyeZip = (values, leap, xLeap, yLeap, {
  mapper,
  dye,
}) => {
  let fn
  const xleapAll0 = xLeap.dif.every(n => !n)
  const yleapAll0 = yLeap.dif.every(n => !n)
  if (!leap.dif && xleapAll0 && yleapAll0) {
    const blendedDye = hslToDye(xLeap.min)
    fn = v => isNumeric(v) ? blendedDye : dye
  }
  if (!xleapAll0 && yleapAll0) {
    const alphaDye = BlendDye(leap, xLeap)
    fn = v => isNumeric(v) ? alphaDye(v) : dye
  }
  if (xleapAll0 && !yleapAll0) {
    const betaDye = BlendDye(leap, yLeap)
    fn = v => isNumeric(v) ? betaDye(v) : dye
  }
  if (!xleapAll0 && !yleapAll0) {
    const alphaDye = BlendDye(leap, xLeap)
    const betaDye = BlendDye(leap, yLeap)
    fn = v => isNumeric(v) ? v >= 0 ? alphaDye(v) : betaDye(v) : dye
  }
  return mapper(values, fn)
}
