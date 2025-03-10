import { rand, randBetw } from '@aryth/rand'
import { NUM }            from '@typen/enum-data-types'

/**
 * Generator function that shuffles an array by shifting elements randomly.
 *
 * @param {*[]} vec - The array to be shuffled.
 * @param {number} shl - The left shift limit for random index selection.
 * @param {number} [shr=shl] - The right shift limit for random index selection. Defaults to shl.
 * @yields {*} - The shuffled element after each swap op.
 * @returns {undefined}
 */
export function* shiftFlopper(vec, shl, shr) {
  vec = vec.slice()
  let hi = vec.length
  if (typeof shr !== NUM) { shr = shl }
  let i = rand(hi)
  if (--hi >= 0) {
    const [ x ] = vec.splice(i, 1)
    yield x
  }
  while (--hi > 0) {
    if (shl > hi) shl = hi - 1
    if (shr > hi) shr = hi - 1
    i = randBetw(i - shl, i + shr)
    while (i > hi) i -= hi
    while (i < 0) i += hi
    const [ x ] = vec.splice(i, 1)
    yield x
  }
  yield vec[0]
  return void 0
}