import { fluoVector }                from '@palett/fluo-vector'
import { FRESH, PLANET }             from '@palett/presets'
import { unwind }                    from '@vect/entries-unwind'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'
import { mutazip }                   from '@vect/vector'

/**
 *
 * @param {*[]} entries
 * @param {Object|{max:string,min:string,na:string}} [preset]
 * @param {Object|{max:string,min:string,na:string}} [stringPreset]
 * @param {boolean} [mutate=true]
 * @param {boolean} [colorant=false]
 * @param {Function} [filter]
 */
export const fluoEntries = (entries, {
    preset = FRESH,
    stringPreset = PLANET,
    mutate = false,
    colorant = false,
    filter
  } = {}
) => {
  let [keys, items] = entries |> unwind
  fluoVector(keys, { preset, stringPreset, mutate: true, colorant, filter })
  fluoVector(items, { preset, stringPreset, mutate: true, colorant, filter })
  const rendered = mutazip(keys, items, (k, v) => [k, v])
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b, (a, b) => b)
    : rendered
}
