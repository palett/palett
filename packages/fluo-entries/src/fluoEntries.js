import { fluoVector }                from '@palett/fluo-vector'
import { wind }                      from '@vect/entries-init'
import { unwind }                    from '@vect/entries-unwind'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'

/**
 * @typedef {Object} FluoSetting
 * @typedef {{min:string,max:string,na:string}} FluoSetting.preset
 * @typedef {string[]} FluoSetting.effects
 * @typedef {Function} FluoSetting.filter
 * @typedef {Function} FluoSetting.mapper
 *
 * @param {[*,*][]} entries
 * @param {FluoSetting[]} configs
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
