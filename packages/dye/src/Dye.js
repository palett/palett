import { dye }       from './_dye'
import { assignRgb } from './assignColor'


/**
 * @property {string|number[]} color
 *
 * @param {string|number[]} color
 * @returns {function(string):string}
 */
export function Dye(color) {
  const conf                              = { head: this.head, tail: this.tail },
        { ansi: assignColor = assignRgb } = this
  if (color) assignColor.call(conf, color)
  return dye.bind(conf)
}







