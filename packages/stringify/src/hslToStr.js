import { Fluo }     from '@palett/fluo'
import { xyzToStr } from './xyzToStr'

/**
 *
 * @param {number[]} hsl
 * @return {string}
 */
export function hslToStr(hsl) { return Fluo.hsl.call(this, hsl|> xyzToStr, hsl) }