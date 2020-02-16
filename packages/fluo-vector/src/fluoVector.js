import { fluoZip } from '@palett/util-fluo'
import { FRESH, JUNGLE } from '@palett/presets'
import { mapper as map, mutate as mutamap, zipper as zip, mutazip } from '@vect/vector'
import { rankVector, STR_ASC } from '@aryth/rank'
import { bound } from '@aryth/bound-vector'
import { allNAString } from '../utils/allNAString'

/**
 *
 * @param {*[]} arr
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [preset]
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluoVector = (arr, {
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false
} = {}) => {
  let values
  if (allNAString(arr)) (values = rankVector(arr, STR_ASC), preset = stringPreset || preset)
  const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
  return fluoZip(arr, { values, mapper, zipper, bound, preset, colorant })
}
