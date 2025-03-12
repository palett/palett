import { Crostab }        from '@analyz/crostab'
import { roundD1 }        from '@aryth/math'
import { minus }          from '@aryth/polar'
import { init as matrix } from '@vect/matrix-init'
import { init as vector } from '@vect/vector-init'
import { H, L, S }        from '../resources/attr.js'
import { HSL }            from './extends/HSL.js'

const { sqrt } = Math

export class Gradient {
  /**
   * @param {{min,max}} preset
   * @param {{x,y}} axis
   * @param {{x,y}} size
   * @param {{top,bottom,left,right}} [extend]
   * @returns {Crostab}
   */
  static crostab({ preset, axis, size, extend } = {}) {
    function axisInds(axis) {
      let list = [ H, S, L ], x = list.indexOf(axis.x), y = list.indexOf(axis.y), z = 0
      while (z === x || z === y) z++
      return { x, y, z }
    }
    const { x, y, z } = axisInds(axis), sz = { x: size.x, y: size.y }
    const min = HSL.fromHex(preset.min),
      max = HSL.fromHex(preset.max),
      dif = HSL.of(minus(max.h, min.h), max.s - min.s, max.l - min.l)
    const xp = { xlo: min[x], xdf: dif[x] / (sz.x - 1) },
      yp = { ylo: min[y], ydf: dif[y] / (sz.y - 1) },
      zp = { xlo: min[z], ylo: min[z], xdf: dif[z] / (sz.x - 1), ydf: dif[z] / (sz.y - 1) }
    if (extend) {
      xp.xlo -= xp.xdf * extend.top, yp.ylo -= yp.ydf * extend.left
      zp.xlo -= zp.xdf * extend.top, zp.ylo -= zp.ydf * extend.left
      sz.x += extend.top + extend.bottom, sz.y += extend.left + extend.right
    }

    function xv(i, _) { return this.xlo + this.xdf * i }
    function yv(_, j) { return this.ylo + this.ydf * j }
    function zv(i, j) { return sqrt((this.xlo + this.xdf * i) * (this.ylo + this.ydf * j)) }
    const hv = axis.x === H ? xv.bind(xp) : axis.y === H ? yv.bind(yp) : zv.bind(zp),
      sv = axis.x === S ? xv.bind(xp) : axis.y === S ? yv.bind(yp) : zv.bind(zp),
      lv = axis.x === L ? xv.bind(xp) : axis.y === L ? yv.bind(yp) : zv.bind(zp)
    return Crostab.build(
      vector(sz.x, (x) => xv.call(xp, x, null).toFixed(1)),
      vector(sz.y, (y) => yv.call(yp, null, y).toFixed(1)),
      matrix(sz.x, sz.y, (x, y) => HSL.of(hv(x, y), sv(x, y), lv(x, y)).restrict().mutate(roundD1)),
      'gradient'
    )
  }
}