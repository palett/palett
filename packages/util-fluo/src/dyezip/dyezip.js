import { bound as vectorBound }   from '@aryth/bound-vector'
import { zipper as vectorZipper } from '@vect/vector-zipper'
import { NL }                     from '../../resources/BOUND_CONF'
import { prepDye }                from '../prepDye/prepDye'

/**
 *
 * @param {*[]} items
 * @param {*[]} values
 * @param {Object} positivePreset
 * @param {Object} negativePreset
 * @returns {Function[]|*[]}
 */
export const dyezip = function (
  items,
  values,
  positivePreset,
  negativePreset,
) {
  const {
    colorant = true,
    zipper = vectorZipper,
    bound = vectorBound,
  } = this
  const valueBound = bound.call(NL, values)
  const dye = prepDye.call({ colorant, zipper }, valueBound, positivePreset, negativePreset)
  return zipper(items, values, dye)
}


