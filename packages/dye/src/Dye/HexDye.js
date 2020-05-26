import { CLR_FORE, hexToAnsi, SC } from '@palett/util-ansi'
import { codedDyer }               from '../dyer/codedDyer'
import { parseEffects }            from '../parseEffects/parseEffects'

/***
 *
 * @param {string} hex
 * @param {...string} [effects]
 * @returns {function(string):string}
 */
export const HexDye = (hex, ...effects) => {
  const config = parseEffects(effects)
  config.h += SC + hexToAnsi(hex) , config.t += SC + CLR_FORE
  return codedDyer.bind(config)
}


