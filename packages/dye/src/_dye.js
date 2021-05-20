import { CSI, SGR } from '@palett/enum-ansi-codes'

/**
 *
 * @param {string} text
 * @returns {string}
 */
export function dye(text) {
  const { head, tail } = this
  // console.log(head, tail)
  return CSI + head + SGR + text + CSI + tail + SGR
}