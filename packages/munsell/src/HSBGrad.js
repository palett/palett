import { limitAboveZero, restrictAboveZero } from '@aryth/math'
import { HSL }                               from './types/HSL'

const { sqrt } = Math
const H = 'h', S = 's', L = 'l'

export class HSBGrad {
  basis
  delta
  constructor(basis, delta) {
    this.basis = basis
    this.delta = delta
  }

  gradH(i) { return restrictAboveZero(this.basis.h + i * this.delta.h, 360) }
  gradS(i) { return limitAboveZero(this.basis.s + i * this.delta.s, 100) }
  gradL(i) { return limitAboveZero(this.basis.b + i * this.delta.b, 100) }

  // func<int, float>
  makeGrad(attr) {
    if (attr === H) { return this.gradH.bind(this) }
    if (attr === S) { return this.gradS.bind(this) }
    if (attr === L) { return this.gradL.bind(this) }
    return null
  }
}

export class HSBGrad2D {
  // func<int, int, (float, float, float)>
  static makeGrad(gradPair, attrX, attrY) {
    // (HSBGrad gradX, HSBGrad gradY) for gradPair
    const [ gradX, gradY ] = gradPair
    /** @type {function} */ const fnH =
                                    attrX === H ? (x, _) => gradX.gradH(x)
                                      : attrY === H ? (_, y) => gradY.gradH(y)
                                        : (x, y) => sqrt(gradX.gradH(x) * gradY.gradH(y))
    /** @type {function} */ const fnS =
                                    attrX === S ? (x, _) => gradX.gradS(x)
                                      : attrY === S ? (_, y) => gradY.gradS(y)
                                        : (x, y) => sqrt(gradX.gradS(x) * gradY.gradS(y))
    /** @type {function} */ const fnL =
                                    attrX === L ? (x, _) => gradX.gradL(x)
                                      : attrY === L ? (_, y) => gradY.gradL(y)
                                        : (x, y) => sqrt(gradX.gradL(x) * gradY.gradL(y))
    // console.writeline($">> (x, y) = ({x}, {y}) [grad] (x, y) = ({gradX.gradH(x)}, {gradY.gradH(y)})");
    return (x, y) => new HSL(fnH(x, y), fnS(x, y), fnL(x, y))
  }
}