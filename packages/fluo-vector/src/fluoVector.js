import { bound, duobound }       from '@aryth/bound-vector'
import { NUM_ASC, STR_ASC }      from '@aryth/comparer'
import { duorank }               from '@aryth/rank-vector'
import { FRESH, JUNGLE, PLANET } from '@palett/presets'
import { dyezip }                from '@palett/util-fluo'
import { isLiteral }             from '@typen/literal'
import { isNumeric }             from '@typen/num-strict'
import { mutazip, zipper }       from '@vect/vector'

const fluoZip = function (vector, values, xPreset, yPreset) {
  const {
    mutate = false,
    colorant = false
  } = this
  const [x, y] = duobound(vector)
  const zipper$1 = mutate ? mutazip : zipper
  return dyezip.call({
    colorant,
    zipper: zipper$1,
    bound
  }, vector, values, xPreset, yPreset)
}

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
  filter = isLiteral
} = {}) => {
  if (!values) values = duorank(vector, {
    preset: FRESH,
    filter: isNumeric,
    comparer: NUM_ASC
  }, {
    preset: PLANET,
    filter,
    comparer: STR_ASC
  })
  const zipper$1 = mutate ? mutazip : zipper
  return fluoZip.call({
    colorant,
    zipper: zipper$1,
    bound
  }, vector, values, preset, stringPreset)
}
