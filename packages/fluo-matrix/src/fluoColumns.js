import { fluoVector }               from '@palett/fluo-vector'
import { FRESH, JUNGLE }            from '@palett/presets'
import { columnsMapper, transpose } from '@vect/matrix'

/**
 *
 * @param {*[][]} mx
 * @param {Object|Preset} [preset]
 * @param {Object|Preset} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 * @param {Function} [filter]
 */
export const fluoColumns = (mx, {
  preset = FRESH,
  stringPreset = JUNGLE,
  colorant = false,
  filter
} = {}) =>
  columnsMapper(mx, col => fluoVector(col, { preset, stringPreset, colorant, filter }))
    |> transpose
