import { limitAboveZero, restrictAboveZero } from '@aryth/math'
import { H, L, S } from '../resources/attr'
import { HSL }     from './HSL'

const { sqrt } = Math

export class VaryFab {
  /** @type {HSL} */ basis
  /** @type {HSL} */ delta
  constructor(basis, delta) {
    this.basis = basis
    this.delta = delta
  }

  varyH(i) { return restrictAboveZero(this.basis.h + i * this.delta.h, 360) }
  varyS(i) { return limitAboveZero(this.basis.s + i * this.delta.s, 100) }
  varyL(i) { return limitAboveZero(this.basis.l + i * this.delta.l, 100) }

  getDelta(attr) {
    if (attr === H) { return this.delta.h }
    if (attr === S) { return this.delta.s }
    if (attr === L) { return this.delta.l }
    return null
  }
  // func<int, float>
  make(attr) {
    if (attr === H) { return this.varyH.bind(this) }
    if (attr === S) { return this.varyS.bind(this) }
    if (attr === L) { return this.varyL.bind(this) }
    return null
  }
  /**
   *
   * @param {VaryFab} varyFabX
   * @param {VaryFab} varyFabY
   * @param {string} attrX any of H, S, L
   * @param {string} attrY any of H, S, L
   * @returns {function(number, number): HSL}
   */
  static crossVary(varyFabX, varyFabY, attrX, attrY) {
    /** @type {function} */const fnH =
                                   attrX === H ? (x, _) => varyFabX.varyH(x)
                                     : attrY === H ? (_, y) => varyFabY.varyH(y)
                                       : (x, y) => sqrt(varyFabX.varyH(x) * varyFabY.varyH(y))
    /** @type {function} */const fnS =
                                   attrX === S ? (x, _) => varyFabX.varyS(x)
                                     : attrY === S ? (_, y) => varyFabY.varyS(y)
                                       : (x, y) => sqrt(varyFabX.varyS(x) * varyFabY.varyS(y))
    /** @type {function} */const fnL =
                                   attrX === L ? (x, _) => varyFabX.varyL(x)
                                     : attrY === L ? (_, y) => varyFabY.varyL(y)
                                       : (x, y) => sqrt(varyFabX.varyL(x) * varyFabY.varyL(y))
    return (x, y) => new HSL(fnH(x, y), fnS(x, y), fnL(x, y))
  }
}