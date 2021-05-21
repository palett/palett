import { DyeFab }  from './DyeFab'
import { pushRgb } from './encolor'

export class DyeFactory extends DyeFab {
  constructor(space, style) {
    super()
    if (space) this.setEncolor(space)
    if (style) this.enstyle(style)
  }

  static build(space, styles) {
    const conf = DyeFab.build().enstyle(styles).setEncolor(space)
    return DyeFactory.prototype.make.bind(conf)
  }

  static prep(space, ...styles) {
    const conf = DyeFab.build().enstyle(styles).setEncolor(space)
    return DyeFactory.prototype.make.bind(conf)
  }

  make(color) {
    const self = this ?? (DyeFab.prototype.init.call({}))
    const conf = DyeFab.prototype.slice.call(self)
    const { encolor = pushRgb } = self
    if (color) encolor.call(conf, color)
    return DyeFab.prototype.render.bind(conf)
  }
}

