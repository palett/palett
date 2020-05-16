import { bound }                                                    from '@aryth/bound-vector'
import { STR_ASC }                                                  from '@aryth/comparer'
import { rank }                                                     from '@aryth/rank-vector'
import { FRESH, JUNGLE }                                            from '@palett/presets'
import { fluoZip }                                                  from '@palett/util-fluo'
import { mapper as map, mutate as mutamap, mutazip, zipper as zip } from '@vect/vector'
import { allNAString }                                              from '../utils/allNAString'

/**
 * @typedef {{max:string,min:string,na:string}} Preset
 * @param {*[]} arr
 * @param {number[]} values
 * @param {Object|Preset} [preset]
 * @param {Object|Preset} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 * @param {Function} filter
 */
export const fluoVector = (arr, {
  values,
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false,
  filter
} = {}) => {
  if (!values && allNAString(arr)) (values = rank(arr, STR_ASC, filter), preset = stringPreset || preset)
  const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
  return fluoZip(arr, { values, mapper, zipper, bound, preset, colorant })
}
