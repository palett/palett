import { FRESH, JUNGLE } from '@palett/presets'
import { fluoVector } from '@palett/fluo-vector'
import { transpose } from '@vect/matrix'
import { mapper as mapColumns } from '@vect/columns-mapper'

/**
 *
 * @param {*[]} mx
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [preset]
 * @param {{max:string|number[],min:string|number[],na:string|number[]}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluoColumns = (mx, {
  preset = FRESH,
  stringPreset = JUNGLE,
  colorant = false
} = {}) =>
  mapColumns(mx, col => fluoVector(col, { preset, stringPreset, colorant }))
    |> transpose
