import { Fluo } from '@palett/fluo'

/**
 *
 * @param {number} int
 * @return {string}
 */
export function intToStr(int) { return Fluo.int.call(this, String(int).padStart(8), int) }