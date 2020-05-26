import { bound as vectorBound }   from '@aryth/bound-vector'
import { mapper as vectorMapper } from '@vect/vector-mapper'
import { NL }                     from '../../resources/BOUND_CONF'
import { Dyer }                   from '../dyer/dyer'

/**
 *
 * @param {*[]} items
 * @param {Object} positivePreset
 * @param {Object} negativePreset
 * @returns {function[]|*[]}
 */
export const dyemap = function (
  items,
  positivePreset,
  negativePreset,
) {
  const {
    colorant = true,
    mapper = vectorMapper,
    bound = vectorBound
  } = this
  const valueBound = bound.call(NL, items)
  const dye = Dyer.call({ colorant }, valueBound, positivePreset, negativePreset)
  return mapper(items, dye)
}








