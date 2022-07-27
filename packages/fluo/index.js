import { draw, RgbDye } from '@palett/dye'

export { Fluo }                           from './src/Fluo.js'
export { PresetCollection }               from './src/PresetCollection.js'
export { POINTWISE, ROWWISE, COLUMNWISE } from '@vect/enum-matrix-directions'
export { arrToPres }                      from './src/arrToPres.js'


export function fluo(text, rgb) { return draw.call(RgbDye.prototype.into.call(this, rgb), text) }