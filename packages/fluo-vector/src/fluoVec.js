import { bound }                                                    from '@aryth/bound-vector'
import { STR_ASC }                                                  from '@aryth/comparer'
import { rank }                                                     from '@aryth/rank-vector'
import { FRESH, JUNGLE }                                            from '@palett/presets'
import { fluoZip }                                                  from '@palett/util-fluo'
import { mapper as map, mutate as mutamap, mutazip, zipper as zip } from '@vect/vector'
import { allNAString }                                              from '../utils/allNAString'

/**
 * @typedef {{max:string,min:string,na:string}} Preset
 * @typedef {{preset:Preset,}}
 * @param {*[]} arr
 * @param {number[]} values
 * @param {Object} x
 * @param {Object} y
 * @param {Object} config
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluoVec = (arr,
  x,
  y,
  config,
  {
  mutate = false,
  colorant = false
} = {}) => {
  const words = splitLiteral(text)
  const ranks = duoRank(words)
  const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
  return fluoZip(arr, { values, mapper, zipper, bound, preset, colorant })
}