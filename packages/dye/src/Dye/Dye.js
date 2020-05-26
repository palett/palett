import { CLR_FORE, rgbToAnsi, SC } from '@palett/util-ansi'
import { codedDyer }               from '../dyer/codedDyer'
import { parseEffects }            from '../parseEffects/parseEffects'

/***
 *
 * @param {number[]} rgb
 * @param {...string} [effects]
 * @returns {function(string):string}
 */
export const Dye = (rgb, ...effects) => {
  const config = parseEffects(effects)
  config.h += SC + rgbToAnsi(rgb) , config.t += SC + CLR_FORE
  return codedDyer.bind(config)
}

