import { arrToPres, Fluo }           from '@palett/fluo'
import { mutazip as mutazipEntries } from '@vect/entries-zipper'

/**
 * @typedef {Object|Preset} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.by
 * @typedef {Function} Preset.to
 *
 * @param {[*,*][]}  entries
 * @param {Preset[]} pres
 * @param {number}  [keyWd]
 * @param {number}  [valWd]
 * @returns {[string,string][]}
 */
export const fluoEntries = function (entries, pres, keyWd, valWd) {
  if (!entries?.length || !pres) return entries
  if (Array.isArray(pres)) pres = arrToPres(pres)
  const mode = this?.colorant, mutate = this?.mutate
  const rendered = Fluo.entries(entries, pres, keyWd, valWd, mode)
  return mutate
    ? mutazipEntries(entries, rendered, (a, b) => b)
    : rendered
}
