import { fluoVec }                   from '@palett/fluo-vector'
import { wind }                      from '@vect/entries-init'
import { unwind }                    from '@vect/entries-unwind'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'

/**
 *
 * @typedef {Object} PresetAndConfig
 * @typedef {string} PresetAndConfig.max
 * @typedef {string} PresetAndConfig.min
 * @typedef {string} PresetAndConfig.na
 * @typedef {Function} PresetAndConfig.mapper
 * @typedef {Function} PresetAndConfig.filter
 *
 * @param entries
 * @param {PresetAndConfig[]} [presetAndConfigs]
 * @param {string[]} [effects]
 */
export const fluoEnt = function (entries, presetAndConfigs, effects) {
  const
    colorant = this?.colorant,
    mutate = this?.mutate
  let [keys, items] = unwind(entries)
  const config = { colorant, mutate: true }
  fluoVec.call(config, keys, presetAndConfigs, effects)
  fluoVec.call(config, items, presetAndConfigs, effects)
  const rendered = wind(keys, items)
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b)
    : rendered
}
