import { Crostab }        from '@analyz/crostab'
import { roundD1 }        from '@aryth/math'
import { minus }          from '@aryth/polar'
import { init as matrix } from '@vect/matrix-init'
import { init as vector } from '@vect/vector-init'
import { H, L, S }        from '../resources/attr'
import { hexToHsl }       from './convert'
import { HSL }            from './HSL'

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
    function getAxisIndexes(axis) {
      const list = [ H, S, L ], x = list.indexOf(axis.x), y = list.indexOf(axis.y)
      let z = 0
      while (z === x || z === y) z++
      return { x, y, z }
    }
    const { x, y, z } = getAxisIndexes(axis)
    const n = { x: size.x, y: size.y }
    const { min, max } = { min: preset.min|> hexToHsl, max: preset.max|> hexToHsl }
    const diff = HSL.build(minus(max.h, min.h), max.s - min.s, max.l - min.l);
    const xp = { min: min[x], dif: diff[x] / (n.x - 1) }
    const yp = { min: min[y], dif: diff[y] / (n.y - 1) }
    const zp = { xmin: min[z], ymin: min[z], xdif: diff[z] / (n.x - 1), ydif: diff[z] / (n.y - 1) }
    if (extend) {
      xp.min -= xp.dif * extend.top
      yp.min -= yp.dif * extend.left
      zp.xmin -= zp.xdif * extend.top
      zp.ymin -= zp.ydif * extend.left
      n.x += extend.top + extend.bottom
      n.y += extend.left + extend.right
    }

    function xv(i, _) { return this.min + this.dif * i }
    function yv(_, j) { return this.min + this.dif * j }
    function zv(i, j) { return sqrt((this.xmin + this.xdif * i) * (this.ymin + this.ydif * j)) }
    const hv = axis.x === H ? xv.bind(xp) : axis.y === H ? yv.bind(yp) : zv.bind(zp)
    const sv = axis.x === S ? xv.bind(xp) : axis.y === S ? yv.bind(yp) : zv.bind(zp)
    const lv = axis.x === L ? xv.bind(xp) : axis.y === L ? yv.bind(yp) : zv.bind(zp)
    return Crostab.from({
      side: vector(n.x, (x) => xv.call(xp, x, null).toFixed(1)),
      head: vector(n.y, (y) => yv.call(yp, null, y).toFixed(1)),
      rows: matrix(n.x, n.y, (x, y) => HSL.build(hv(x, y), sv(x, y), lv(x, y)).restrict().mutate(roundD1)),
    })
  }
}

// const base = {
//   x: min[x],
//   y: min[y],
//   zx: min[z],
//   zy: min[z],
// }
// const delta = {
//   x: diff[x] / (n.x - 1),
//   y: diff[y] / (n.y - 1),
//   zx: diff[z] / (n.x - 1),
//   zy: diff[z] / (n.y - 1)
// }
// if (extend) {
//   base.x -= delta.x * extend.top
//   base.y -= delta.y * extend.left
//   base.zx -= delta.zx * extend.top
//   base.zy -= delta.zy * extend.left
//   n.x += extend.top + extend.bottom
//   n.y += extend.left + extend.right
// }
