import { betw, rand } from '@aryth/rand'
import { NUM }        from '@typen/enum-data-types'

/**
 * Generator function that shuffles an array by shifting elements randomly.
 *
 * @param {*[]} vec - The array to be shuffled.
 * @param {number} shl - The left shift limit for random index selection.
 * @param {number} [shr=shl] - The right shift limit for random index selection. Defaults to shl.
 * @yields {*} - The shuffled element after each swap operation.
 * @returns {undefined}
 */
export function* finiteShifter(vec, shl, shr) {
  let hi = vec.length
  // Create a copy of the array and track available indices
  const bin = Array(hi).fill(true)
  if (typeof shr !== NUM) { shr = shl }
  let i = rand(hi)
  // First element
  if (hi > 0) {
    bin[i] = false
    yield vec[i]
    hi--
  }
  while (hi > 1) {
    // Adjust shift limits if needed
    shl = Math.min(shl, hi - 1)
    shr = Math.min(shr, hi - 1)
    // Calculate new index within bounds
    let newI = betw(i - shl, i + shr)
    // Wrap around if outside valid range
    while (newI >= vec.length) newI -= vec.length
    while (newI < 0) newI += vec.length
    // Skip already used indices
    while (!bin[newI]) {
      newI = (newI + 1) % vec.length
    }
    // Mark as used and yield
    i = newI
    bin[i] = false
    yield vec[i]
    hi--
  }
  // Last remaining element
  for (let j = 0; j < vec.length; j++) {
    if (bin[j]) {
      yield vec[j]
      break
    }
  }
  return void 0
}