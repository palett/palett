import { boundaries }            from '@aryth/bound-matrix'
import { oneself }               from '@ject/oneself'
import { hslToHex }              from '@palett/convert'
import { COLOR, MAKER, RENDER }  from '@palett/enum-colorant-modes'
import { arrToPres, Fluo, Pres } from '@palett/fluo'
import { Proj }                  from '@palett/projector'
import { valid }                 from '@typen/nullish'
import { height, width }         from '@vect/matrix-index'
import { mapper, mutate }        from '@vect/matrix-mapper'

export function fluoByPoints2(matrix, pres, wd) {
  if (!matrix?.length) return []
  if (Array.isArray(pres)) pres = arrToPres(pres)
  const fluo = new Fluo(pres)
  const vec = fluo.project(matrix.flat(1), wd, this?.mode, this?.mutate)
  const h = height(matrix), w = width(matrix), t = Array(h)
  for (let i = 0; i < h; i++)
    for (let j = 0, r = t[i] = Array(w); j < w; j++)
      r[j] = vec[i * w + j]
  return t
}

/**
 * @typedef {Object|Preset} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.by
 * @typedef {Function} Preset.to
 *
 * @param {*[][]} matrix
 * @param {Preset[]} opts
 * @returns {*[][]}
 */
export const fluoByPoints = function (matrix, opts) {
  const h = height(matrix), w = width(matrix)
  if (!h || !w) return [ [] ]
  if (!opts) return matrix
  opts = Pres.prepBound(opts ?? [])
  function makeProjector(matrix, opts) {
    const [ cX, cY ] = opts
    const [ mX, mY ] = boundaries(matrix, opts)
    const [ pX, pY ] = [ Proj.from(mX, cX), Proj.from(mY, cY) ]
    return [ [ mX, pX ], [ mY, pY ] ]
  }
  const projectors = makeProjector(matrix, opts)
  const to = this?.mutate ? mutate : mapper
  switch (this?.colorant) {
    case COLOR:
      return to(matrix, Thrust.into(projectors))
    case MAKER:
      return to(matrix, Thrust.make(projectors))
    case RENDER:
      return to(matrix, Thrust.render(projectors))
    default:
      return to(matrix, Thrust.render(projectors))
  }
}


export class Thrust {
  static into([ [ bX, pX ], [ bY, pY ] ]) {
    function toHex(hsl) { return hsl ? hslToHex(hsl) : null }
    return (_, i, j) => {
      let v
      if (valid(v = bX && bX[i][j])) { return toHex(pX.into(v)) }
      if (valid(v = bY && bY[i][j])) { return toHex(pY.into(v)) }
      return null
    }
  }
  static make([ [ bX, pX ], [ bY, pY ] ]) {
    return (_, i, j) => {
      let v
      if (valid(v = bX && bX[i][j])) { return pX.make(v) }
      if (valid(v = bY && bY[i][j])) { return pY.make(v) }
      return (pX || pY)?.make(pX.nap) ?? oneself
    }
  }
  static render([ [ bX, pX ], [ bY, pY ] ]) {
    return (n, i, j) => {
      let v
      if (valid(v = bX && bX[i][j])) { return pX.render(v, n) }
      if (valid(v = bY && bY[i][j])) { return pY.render(v, n) }
      return (pX || pY)?.render(pX.nap, n) ?? n
    }
  }
}