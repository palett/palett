import { fluoVec }                   from '@palett/fluo-vector'
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
 * @param {string[]} [effects]
 */
export const fluoEnt = function (entries, presets, effects) {
  const
    colorant = this?.colorant,
    mutate = this?.mutate
  let [keys, items] = unwind(entries)
  const config = { colorant, mutate: true }
  fluoVec.call(config, keys, presets, effects)
  fluoVec.call(config, items, presets, effects)
  const rendered = wind(keys, items)
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b)
    : rendered
}
