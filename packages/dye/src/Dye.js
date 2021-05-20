import { dye }       from './_dye'
import { assignRgb } from './assignColor'


/**
 * @property {string|number[]} color
 *
 * @param {string|number[]} color
 * @returns {function(string):string}
 */
export function Dye(color) {
  const self                                                    = this ?? {},
        { ansi: assignColor = assignRgb, head = '', tail = '' } = self,
        conf                                                    = { head, tail }
  if (color) assignColor.call(conf, color)
  return dye.bind(conf)
}







