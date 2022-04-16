import { enclose } from '@palett/util-ansi'

/**
 *
 * @param {string} tx
 * @returns {string}
 */
export function codedBuff(tx) {
  const { h, t } = this
  return enclose(h) + tx + enclose(t)
}
