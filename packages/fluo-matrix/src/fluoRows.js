import { FRESH, JUNGLE } from '@palett/presets'
import { fluoVector } from '@palett/fluo-vector'
import { mapper as mapVec, mutate as mutaVec } from '@vect/vector'

/**
 *
 * @param {*[][]} mx
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [preset]
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluoRows = (mx, {
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false
} = {}) => {
  const mapper = mutate ? mutaVec : mapVec
  return mapper(mx, row => fluoVector(row, { preset, stringPreset, mutate, colorant }))
}
