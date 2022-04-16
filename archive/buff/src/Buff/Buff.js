import { codedBuff }    from '../helpers/codedBuff'
import { parseEffects } from '../helpers/parseEffects'

/***
 *
 * @param {...string} [effects]
 * @returns {function(string):string}
 */
export const Buff = (...effects) => {
  const config = parseEffects(effects)
  return codedBuff.bind(config)
}

