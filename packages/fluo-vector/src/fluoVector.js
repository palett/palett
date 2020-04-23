import { bound }                                                    from '@aryth/bound-vector'
import { STR_ASC }                                                  from '@aryth/comparer'
import { rank }                                                     from '@aryth/rank-vector'
import { FRESH, JUNGLE }                                            from '@palett/presets'
import { fluoZip }                                                  from '@palett/util-fluo'
import { mapper as map, mutate as mutamap, mutazip, zipper as zip } from '@vect/vector'
import { allNAString }                                              from '../utils/allNAString'

/**
 *
 * @param {*[]} arr
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [preset]
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 * @param {Function} filter
 */
export const fluoVector = (arr, {
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false,
  filter
} = {}) => {
  let values
  if (allNAString(arr)) (
    values = rank(arr, STR_ASC, filter).map(x => x === -1 ? NaN : x),
      preset = stringPreset || preset
  )
  const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
  return fluoZip(arr, { values, mapper, zipper, bound, preset, colorant })
}
