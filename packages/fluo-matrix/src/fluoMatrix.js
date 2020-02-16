import { FRESH, JUNGLE } from '@palett/presets'
import { fluoZip } from '@palett/util-fluo'
import { mapper as map, mutate as mutamap, zipper as zip, mutazip } from '@vect/matrix'
import { rankMatrix, STR_ASC } from '@aryth/rank'
import { bound } from '@aryth/bound-matrix'
import { allNAString } from '../utils/allString'

/**
 *
 * @param {*[]} mx
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [preset]
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluoMatrix = (mx, {
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false
} = {}) => {
  let values
  if (allNAString(mx)) (values = rankMatrix(mx, STR_ASC), preset = stringPreset || preset)
  const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
  return fluoZip(mx, { values, mapper, zipper, bound, preset, colorant })
}



