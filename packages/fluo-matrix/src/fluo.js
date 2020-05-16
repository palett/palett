import { FRESH, JUNGLE } from '@palett/presets'
import { POINTWISE, ROWWISE, COLUMNWISE } from '@vect/matrix'
import { fluoMatrix } from './fluoMatrix'
import { fluoRows } from './fluoRows'
import { fluoColumns } from './fluoColumns'

/**
 *
 * @param {*[][]} mx
 * @param {number} [direct] pointwise = 0, rowwise = 1, columnwise = 2
 * @param {Object} [preset]
 * @param {Object} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluo = (mx, {
  direct = ROWWISE,
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false
} = {}) => {
  switch (direct) {
    case POINTWISE:
      return fluoMatrix(mx, { preset, stringPreset, mutate, colorant })
    case ROWWISE:
      return fluoRows(mx, { preset, stringPreset, mutate, colorant })
    case COLUMNWISE:
      return fluoColumns(mx, { preset, stringPreset, mutate, colorant })
    default:
      return fluoMatrix(mx, { preset, stringPreset, mutate, colorant })
  }
}



