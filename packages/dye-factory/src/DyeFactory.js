import { HEX, HSL, INT, RGB } from '@palett/enum-color-space'
import { DyeFab }             from './DyeFab'

export class DyeFactory extends DyeFab {
  constructor(space, style) { super(space, style) }
  static build(space, style) { return new DyeFactory(space, style) }
  static prep(space, ...style) { return DyeFactory.prototype.make.bind(DyeFab.build(space, style)) }
  static hex(...style) { return DyeFactory.prototype.make.bind(DyeFab.build(HEX, style)) }
  static rgb(...style) { return DyeFactory.prototype.make.bind(DyeFab.build(RGB, style)) }
  static hsl(...style) { return DyeFactory.prototype.make.bind(DyeFab.build(HSL, style)) }
  static int(...style) { return DyeFactory.prototype.make.bind(DyeFab.build(INT, style)) }

  make(color) {
    const local = this?.slice?.call(this) ?? DyeFab.shallow()
    if (color) this.encolor.call(local, color)
    return DyeFab.prototype.render.bind(local)
  }

  render(color, text) {
    const local = this?.slice?.call(this) ?? DyeFab.shallow()
    if (color) this.encolor.call(local, color)
    return DyeFab.prototype.render.call(local, text)
  }
}

