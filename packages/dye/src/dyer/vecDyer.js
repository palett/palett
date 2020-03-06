import { br } from '@palett/util-ansi'

/**
 *
 * @param {string} tx
 * @returns {string}
 */
export function vecDyer (tx) {
  return br(this[0]) + tx + br(this[1])
}
