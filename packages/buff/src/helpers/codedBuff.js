import { brt } from '@palett/util-ansi'

/**
 *
 * @param {string} tx
 * @returns {string}
 */
export function codedBuff (tx) {
  const { h, t } = this
  return brt(h) + tx + brt(t)
}
