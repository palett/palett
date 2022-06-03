import { boundaries }           from '@aryth/bound-matrix'
import { oneself }              from '@ject/oneself'
import { hslToHex }             from '@palett/convert'
import { COLOR, MAKER, RENDER } from '@palett/enum-colorant-modes'
import { Proj }                 from '@palett/projector'
import { valid }                from '@typen/nullish'
import { mapper, mutate }       from '@vect/matrix-mapper'
import { height, width }        from '@vect/matrix-index'

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
 * @param {Preset[]} configs
 * @returns {*[][]}
 */
export const fluoByPoints = function (matrix, configs) {
  const h = height(matrix), w = width(matrix)
  if (!h || !w) return [[]]
  function makeProjector(matrix, configs = []) {
    const [cX, cY] = configs
    const [mX, mY] = boundaries(matrix, configs)
    const [pX, pY] = [Proj.fromHEX(mX, cX), Proj.fromHEX(mY, cY)]
    return [[mX, pX], [mY, pY]]
  }
  const projectors = makeProjector(matrix, configs)
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
  static into([[bX, pX], [bY, pY]]) {
    function toHex(hsl) { return hsl ? hslToHex(hsl) : null }
    return (_, i, j) => {
      let v
      if (valid(v = bX && bX[i][j])) { return pX.into(v)|> toHex }
      if (valid(v = bY && bY[i][j])) { return pY.into(v)|> toHex }
      return null
    }
  }
  static make([[bX, pX], [bY, pY]]) {
    return (_, i, j) => {
      let v
      if (valid(v = bX && bX[i][j])) { return pX.make(v) }
      if (valid(v = bY && bY[i][j])) { return pY.make(v) }
      return (pX || pY)?.make(pX.nap) ?? oneself
    }
  }
  static render([[bX, pX], [bY, pY]]) {
    return (n, i, j) => {
      let v
      if (valid(v = bX && bX[i][j])) { return pX.render(v, n) }
      if (valid(v = bY && bY[i][j])) { return pY.render(v, n) }
      return (pX || pY)?.render(pX.nap, n) ?? n
    }
  }
}