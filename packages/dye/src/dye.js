import { assignRgb } from '../util/assignColor'
import { Panel }     from '../util/panel'


/**
 * @param {string|number[]} color
 * @returns {function(string):string}
 */
export function Dye(color) {
  const self = this ?? (Panel.prototype.init.call({}))
  const conf = Panel.prototype.slice.call(self)
  const { assignColor = assignRgb } = self
  if (color) assignColor.call(conf, color)
  return Panel.prototype.render.bind(conf)
}







