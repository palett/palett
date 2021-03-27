import { boundaries }                                       from '@aryth/bound-matrix'
import { oneself }                                          from '@ject/oneself'
import { hslToHex }                                         from '@palett/convert'
import { COLOR, MAKER, RENDER }                             from '@palett/enum-colorant-modes'
import { ProjectorFactory }                                 from '@palett/projector-factory'
import { AEU }                                              from '@spare/enum-chars'
import { logger }                                           from '@spare/logger'
import { nullish }                                          from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc, size } from '@vect/matrix'
import { select }                                           from '@vect/object-select'

/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[][]} matrix
 * @param {Preset[]} configs
 * @returns {*[][]}
 */
export const fluoByPoints = function (matrix, configs) {
  const [h, w] = size(matrix)
  if (!h || !w) return [[]]
  const projectorSet = makeProjector(matrix, configs)
  const mapper = this?.mutate ? mutateFunc : mapperFunc
  switch (this?.colorant) {
    case COLOR:
      return mapper(matrix, PointColorFactory.color(projectorSet))
    case MAKER:
      return mapper(matrix, PointColorFactory.maker(projectorSet))
    case RENDER:
    default:
      return mapper(matrix, PointColorFactory.render(projectorSet))
  }
}

const makeProjector = (matrix, configs = []) => {
  const [confX, confY] = configs
  const [matX, matY] = boundaries(matrix, configs)
  // ;
  // (matX ? (select.call({ keys: ['max', 'min'] }, matX)) : AEU) |> JSON.stringify |> logger;
  // (matY ? (select.call({ keys: ['max', 'min'] }, matY)) : AEU) |> JSON.stringify |> logger
  const [projX, projY] = [ProjectorFactory.fromHEX(matX, confX), ProjectorFactory.fromHEX(matY, confY)]
  return [[matX, projX], [matY, projY]]
}

export class PointColorFactory {
  static color([[bX, pX], [bY, pY]]) {
    function toColor(some) { return some ? some|> hslToHex : null }
    return (_, i, j) => {
      let v
      if (!nullish(v = bX && bX[i][j])) {return pX.color(v)|> toColor}
      if (!nullish(v = bY && bY[i][j])) {return pY.color(v)|> toColor}
      return null
    }
  }
  static maker([[bX, pX], [bY, pY]]) {
    return (_, i, j) => {
      let v
      if (!nullish(v = bX && bX[i][j])) { return pX.make(v) }
      if (!nullish(v = bY && bY[i][j])) { return pY.make(v) }
      return pX?.make(pX.na) ?? oneself
    }
  }
  static render([[bX, pX], [bY, pY]]) {
    return (n, i, j) => {
      let v
      if (!nullish(v = bX && bX[i][j])) { return pX.render(v, n) }
      if (!nullish(v = bY && bY[i][j])) { return pY.render(v, n) }
      return pX?.render(pX.na, n) ?? n
    }
  }
}