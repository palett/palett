import { FRESH, JUNGLE } from '@palett/presets'
import { fluoVector } from '@palett/fluo-vector'
import { transpose, columnsMapper } from '@vect/matrix'

/**
 *
 * @param {*[][]} mx
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
  columnsMapper(mx, col => fluoVector(col, { preset, stringPreset, colorant }))
    |> transpose
