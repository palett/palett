import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'

export { Fluo } from './src/Fluo.js'
// export { Pres, PresetCollection }         from './src/PresetCollection.js'

export const POINTWISE = 0
export const ROWWISE = 1
export const COLUMNWISE = 2

export function fluo(text, [ r, g, b ]) {
  const head = CSI + (this?.head ?? '') + FORE_INI + SC + r + SC + g + SC + b + SGR
  const tail = CSI + (this?.tail ?? '') + FORE_DEF + SGR
  return head + text + tail
}


/**
 * @deprecated This function is deprecated and will be removed in future versions.
 * @param {*} pres - The input parameter.
 * @returns {*} The same input parameter.
 */
export function intoPres(pres) { return pres }