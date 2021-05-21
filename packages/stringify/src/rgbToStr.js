import { Fluo }     from '@palett/fluo'
import { xyzToStr } from './xyzToStr'

/**
 *
 * @param {number[]} rgb
 * @return {string}
 */
export function rgbToStr(rgb) { return Fluo.rgb.call(this, rgb|> xyzToStr, rgb) }