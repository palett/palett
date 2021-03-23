import { fluoVector }                from '@palett/fluo-vector'
import { wind }                      from '@vect/entries-init'
import { unwind }                    from '@vect/entries-unwind'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'

/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {[*,*][]} entries
 * @param {Preset[]} configs
 * @returns {*[]}
 */
export const fluoEntries = function (entries, configs) {
  const
    colorant = this?.colorant,
    mutate = this?.mutate
  let [keys, items] = unwind(entries)
  const context = { colorant, mutate: true }
  fluoVector.call(context, keys, configs)
  fluoVector.call(context, items, configs)
  const rendered = wind(keys, items)
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b)
    : rendered
}
