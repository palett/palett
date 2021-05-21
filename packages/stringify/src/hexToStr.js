import { Fluo } from '@palett/fluo'

/**
 *
 * @param {string} hex
 * @return {string}
 */
export function hexToStr(hex) { return Fluo.hex.call(this, hex, hex) }


