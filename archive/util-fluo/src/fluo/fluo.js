import { dyemap } from '../dyemap/dyemap'
import { dyezip } from '../dyezip/dyezip'

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param positivePreset
 * @param negativePreset
 * @returns {function[]|*[]}
 */
export const fluo = function (items, values, positivePreset, negativePreset) {
  const {
    mapper,
    zipper,
    bound,
    colorant = false
  } = this
  return values
    ? dyezip.call({
      colorant,
      zipper,
      bound
    }, items, values, positivePreset, negativePreset,)
    : dyemap.call({
      colorant,
      mapper,
      bound
    }, items, positivePreset, negativePreset,)
}
