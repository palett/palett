import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'

export { POINTWISE, ROWWISE, COLUMNWISE } from '@vect/enum-matrix-directions'
export { arrToPres }                      from './src/arrToPres.js'
export { Fluo }                           from './src/Fluo.js'
export { Pres, PresetCollection }         from './src/PresetCollection.js'

export function fluo(text, [ r, g, b ]) {
  const head = CSI + (this?.head ?? '') + FORE_INI + SC + r + SC + g + SC + b + SGR
  const tail = CSI + (this?.tail ?? '') + FORE_DEF + SGR
  return head + text + tail
}