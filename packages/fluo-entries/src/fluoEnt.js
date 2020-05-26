import { fluoVec }                   from '@palett/fluo-vector/src/fluoVec'
import { wind }                      from '@vect/entries-init'
import { unwind }                    from '@vect/entries-unwind'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param entries
 * @param {PalettProjectConfig} x
 * @param {PalettProjectConfig} y
 */
export const fluoEnt = function (entries, x = {}, y = {}
) {
  const { colorant = false, mutate = false } = this ?? {}
  let [keys, items] = unwind(entries)
  fluoVec.call({ colorant, mutate: true }, keys, x, y)
  fluoVec.call({ colorant, mutate: true }, items, x, y)
  const rendered = wind(keys, items)
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b, (a, b) => b)
    : rendered
}
