import { CLR_FORE, hexToAnsi, SC } from '@palett/util-ansi'
import { codedDyer }               from '../helpers/codedDyer'
import { parseEffects }            from '../helpers/parseEffects'

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


