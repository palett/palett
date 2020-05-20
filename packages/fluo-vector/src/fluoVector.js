import { bound }                                                    from '@aryth/bound-vector'
import { NUM_ASC, STR_ASC }                                         from '@aryth/comparer'
import { duorank }                                                  from '@aryth/rank-vector'
import { FRESH, JUNGLE, PLANET }                                    from '@palett/presets'
import { fluo }                                                     from '@palett/util-fluo'
import { isLiteral }                                                from '@typen/literal'
import { isNumeric }                                                from '@typen/num-strict'
import { mapper as map, mutate as mutamap, mutazip, zipper as zip } from '@vect/vector'

/**
 * @typedef {{max:string,min:string,na:string}} Preset
 * @param {*[]} vector
 * @param {number[]} values
 * @param {Object|Preset} [preset]
 * @param {Object|Preset} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 * @param {Function} filter
 */
export const fluoVector = (vector, {
  values,
  preset = FRESH,
  stringPreset = JUNGLE,
  mutate = false,
  colorant = false,
  filter = isLiteral,
} = {}) => {
  if (!values)
    values = duorank(vector,
      { preset: FRESH, filter: isNumeric, comparer: NUM_ASC },
      { preset: PLANET, filter: filter, comparer: STR_ASC }
    )
  const [mapper, zipper] = mutate ? [mutamap, mutazip] : [map, zip]
  return fluo.call({ mapper, zipper, bound, colorant }, vector, values, preset, stringPreset)
}
