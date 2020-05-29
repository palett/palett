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
 * @param {PalettProjectConfig[]} [presets]
 */
export const fluoEnt = function (entries, presets) {
  const
    colorant = this?.colorant,
    mutate = this?.mutate
  let [keys, items] = unwind(entries)
  fluoVec.call({ colorant, mutate: true }, keys, presets)
  fluoVec.call({ colorant, mutate: true }, items, presets)
  const rendered = wind(keys, items)
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b)
    : rendered
}
