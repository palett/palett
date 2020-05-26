import { bound }         from '@aryth/bound-matrix'
import { STR_ASC }       from '@aryth/comparer'
import { rank }          from '@aryth/rank-matrix'
import { FRESH, JUNGLE } from '@palett/presets'

import { fluo, fluoZip }                  from '@palett/util-fluo'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { mapper as map, mutate as mutamap, mutazip, zipper as zip } from '@vect/matrix'
import { allNAString }                                              from '../../utils/allString'
import { fluoColumns }                                              from './fluoColumns'
import { fluoRows }                                                 from './fluoRows'

/**
 *
 * @param {*[][]} mx
 * @param {number} direct - pointwise: 0, rowwise: 1, columnwise: 2
 * @param {Object|Preset} [preset]
 * @param {Object|Preset} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 * @param {Function} [filter]
 */
export const fluoMatrix = (mx, {
  direct = POINTWISE,
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false,
  filter,
} = {}) => {
  switch (direct) {
    case ROWWISE:
      return fluoRows(mx, { preset, stringPreset, mutate, colorant, filter })
    case COLUMNWISE:
      return fluoColumns(mx, { preset, stringPreset, mutate, colorant, filter })
    case POINTWISE:
    default:
      let values
      if (allNAString(mx)) (values = rank(mx, STR_ASC, filter), preset = stringPreset || preset)
      const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
      return fluo.call({mapper,zipper,},mx, { values, mapper, zipper, bound, preset, colorant })
  }
}



