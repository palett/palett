import { bound }         from '@aryth/bound-matrix'
import { STR_ASC }       from '@aryth/comparer'
import { rank }          from '@aryth/rank-matrix'
import { FRESH, JUNGLE } from '@palett/presets'

import { fluoZip }                                                                                  from '@palett/util-fluo'
import { COLUMNWISE, mapper as map, mutate as mutamap, mutazip, POINTWISE, ROWWISE, zipper as zip } from '@vect/matrix'
import { allNAString }                                                                              from '../utils/allString'
import { fluoColumns }                                                                              from './fluoColumns'
import { fluoRows }                                                                                 from './fluoRows'

/**
 *
 * @param {*[][]} mx
 * @param {number} direct - pointwise: 0, rowwise: 1, columnwise: 2
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [preset]
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [stringPreset]
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
      if (allNAString(mx)) (
        values = map(rank(mx, STR_ASC, filter), x => x === -1 ? NaN : x),
          preset = stringPreset || preset
      )
      const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
      return fluoZip(mx, { values, mapper, zipper, bound, preset, colorant })
  }
}



