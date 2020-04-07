import { FRESH, JUNGLE } from '@palett/presets'
import { fluoVector } from '@palett/fluo-vector'
import { mutazip } from '@vect/vector'
import { unwind } from '@vect/entries-unwind'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'

/**
 *
 * @param {*[]} entries
 * @param {Object|{max:string,min:string,na:string}} [preset]
 * @param {Object|{max:string,min:string,na:string}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 */
export const fluoEntries = (entries, {
    preset = FRESH,
    stringPreset = JUNGLE,
    mutate = false,
    colorant = false
  } = {}
) => {
  let [keys, items] = entries |> unwind
  fluoVector(keys, { preset, stringPreset, mutate: true, colorant })
  fluoVector(items, { preset, stringPreset, mutate: true, colorant })
  const rendered = mutazip(keys, items, (k, v) => [k, v])
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b, (a, b) => b)
    : rendered
}
