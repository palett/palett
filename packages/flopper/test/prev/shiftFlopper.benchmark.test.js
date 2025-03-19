import { rand, betw } from '@aryth/rand'
import { NUM }            from '@typen/enum-data-types'
import { init }           from '@vect/vector-init'
import { test }           from 'node:test'

/**
 * Xaylam Original
 * Generator function that shuffles an array by shifting elements randomly.
 *
 * @param {*[]} vec - The array to be shuffled.
 * @param {number} shl - The left shift limit for random index selection.
 * @param {number} [shr=shl] - The right shift limit for random index selection. Defaults to shl.
 * @yields {*} - The shuffled element after each swap op.
 * @returns {undefined}
 */
export function* shiftFlopperCamp(vec, shl, shr) {
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
    i = betw(i - shl, i + shr)
    while (i > hi) i -= hi
    while (i < 0) i += hi
    const [ x ] = vec.splice(i, 1)
    yield x
  }
  yield vec[0]
  return void 0
}

/**
 * Claude
 * Generator function that shuffles an array by shifting elements randomly.
 *
 * @param {*[]} arr - The array to be shuffled.
 * @param {number} shl - The left shift limit for random index selection.
 * @param {number} [shr=shl] - The right shift limit for random index selection. Defaults to shl.
 * @yields {*} - The shuffled element after each swap operation.
 * @returns {undefined}
 */
export function* shiftFlopperFuse(arr, shl, shr) {
  // Create a copy of the array and track available indices
  // const arr = vec.slice()
  const bin = Array(arr.length).fill(true)
  if (typeof shr !== NUM) { shr = shl }
// Helper function for random integer
  function rand(max) { return ~~(Math.random() * max) }
// Helper function for random integer between min and max
  function betw(min, max) { return min + rand(max - min + 1) }
  let hi = arr.length
  let i = rand(hi)
  // First element
  if (hi > 0) {
    bin[i] = false
    yield arr[i]
    hi--
  }
  while (hi > 1) {
    // Adjust shift limits if needed
    shl = Math.min(shl, hi - 1)
    shr = Math.min(shr, hi - 1)
    // Calculate new index within bounds
    let newI = betw(i - shl, i + shr)
    // Wrap around if outside valid range
    while (newI >= arr.length) newI -= arr.length
    while (newI < 0) newI += arr.length
    // Skip already used indices
    while (!bin[newI]) {
      newI = (newI + 1) % arr.length
    }
    // Mark as used and yield
    i = newI
    bin[i] = false
    yield arr[i]
    hi--
  }
  // Last remaining element
  for (let j = 0; j < arr.length; j++) {
    if (bin[j]) {
      yield arr[j]
      break
    }
  }
  return void 0
}

/**
 * DSR1
 * 高性能数组乱序生成器（Fisher-Yates变体）
 * @param {Array} vec - 原始数组
 * @param {number} shl - 左偏移限制
 * @param {number} [shr=shl] - 右偏移限制
 * @yields {*} 乱序元素
 */
export function* shiftFlopperVelo(vec, shl, shr = shl) {
  const arr = [ ...vec ]
  let hi = arr.length

  if (hi === 0) return

  let current = Math.floor(Math.random() * hi);
  [ arr[hi - 1], arr[current] ] = [ arr[current], arr[hi - 1] ]
  yield arr[--hi]

  while (hi > 0) {
    const offset = Math.floor(Math.random() * (shr + shl + 1)) - shl
    current = (current + offset + hi) % hi;

    [ arr[hi - 1], arr[current] ] = [ arr[current], arr[hi - 1] ]
    yield arr[--hi]
  }
}

/**
 * Grok3
 * Generator function that shuffles an array by shifting elements randomly.
 *
 * @param {*[]} vec - The array to be shuffled.
 * @param {number} shl - The left shift limit for random index selection.
 * @param {number} [shr=shl] - The right shift limit for random index selection. Defaults to shl.
 * @yields {*} - The shuffled element after each step.
 * @returns {undefined}
 */
export function* shiftFlopperNexo(vec, shl, shr) {
  // Default shr to shl if not provided
  if (typeof shr !== 'number') {
    shr = shl
  }

  const n = vec.length
  if (n === 0) return

  // Array of remaining indices
  const indices = Array.from({ length: n }, (_, i) => i)
  let currentIndex = Math.floor(Math.random() * n) // Start at a random index

  while (indices.length > 0) {
    // Calculate the shift range, constrained by array bounds
    const minShift = Math.max(-shl, -currentIndex)
    const maxShift = Math.min(shr, n - 1 - currentIndex)
    const shift = Math.floor(Math.random() * (maxShift - minShift + 1)) + minShift
    let nextIndex = currentIndex + shift

    // Wrap around the array bounds
    while (nextIndex >= n) nextIndex -= n
    while (nextIndex < 0) nextIndex += n

    // Find and remove the next index from the remaining indices
    const actualIndex = indices.indexOf(nextIndex)
    if (actualIndex === -1) {
      // If the calculated index was already used, pick a random remaining index
      const randomIndex = Math.floor(Math.random() * indices.length)
      const [ removedIndex ] = indices.splice(randomIndex, 1)
      yield vec[removedIndex]
      currentIndex = removedIndex
    } else {
      const [ removedIndex ] = indices.splice(actualIndex, 1)
      yield vec[removedIndex]
      currentIndex = removedIndex
    }
  }

  return void 0
}

test('shift flopper benchmark', () => {
  const vec = init(2160, i => i)

  const CAMP = 'array → shift flop - camp'
  const FUSE = 'array → shift flop - fuse'
  const VELO = 'array → shift flop - velo'
  const NEXO = 'array → shift flop - nexo'

  const quant = 1e4
  const shl = 3, shr = 3
  console.log(CAMP, [ ...shiftFlopperCamp(vec, shl, shr) ])
  console.log(FUSE, [ ...shiftFlopperFuse(vec, shl, shr) ])
  console.log(VELO, [ ...shiftFlopperVelo(vec, shl, shr) ])
  console.log(NEXO, [ ...shiftFlopperNexo(vec, shl, shr) ])

  let result

  console.time(CAMP)
  for (let i = 0; i < quant; i++) result = [ ...shiftFlopperCamp(vec, shl, shr) ]
  console.timeEnd(CAMP)

  console.time(FUSE)
  for (let i = 0; i < quant; i++) result = [ ...shiftFlopperFuse(vec, shl, shr) ]
  console.timeEnd(FUSE)

  console.time(VELO)
  for (let i = 0; i < quant; i++) result = [ ...shiftFlopperVelo(vec, shl, shr) ]
  console.timeEnd(VELO)

  console.time(NEXO)
  for (let i = 0; i < quant; i++) result = [ ...shiftFlopperNexo(vec, shl, shr) ]
  console.timeEnd(NEXO)


})