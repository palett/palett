import { boundaries }                                 from '@aryth/bound-vector'
import { oneself }                                    from '@ject/oneself'
import { hslToHex }                                   from '@palett/convert'
import { COLOR, MAKER, RENDER }                       from '@palett/enum-colorant-modes'
import { ProjectorFactory }                           from '@palett/projector'
import { nullish }                                    from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector-mapper'

/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.max
 * @typedef {string} Preset.min
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[]} vec
 * @param {Preset[]} presets
 * @returns {*[]}
 */
export const fluoVector = function (vec, presets) {
  if (!vec?.length) return []
  const projectorSet = makeProjector(vec, presets)
  const mapper = this?.mutate ? mutateFunc : mapperFunc
  switch (this?.colorant) {
    case COLOR:
      return mapper(vec, PointColorFactory.color(projectorSet))
    case MAKER:
      return mapper(vec, PointColorFactory.maker(projectorSet))
    case RENDER:
    default:
      return mapper(vec, PointColorFactory.render(projectorSet))
  }
}

const makeProjector = (vec, configs = []) => {
  const [confX, confY] = configs
  const [vecX, vecY] = boundaries(vec, configs)
  const [projX, projY] = [ProjectorFactory.build(vecX, confX), ProjectorFactory.build(vecY, confY)]
  return [[vecX, projX], [vecY, projY]]
}

export class PointColorFactory {
  static color([[bX, pX], [bY, pY]]) {
    function toColor(hsl) { return hsl ? hsl|> hslToHex : null }
    return (_, i) => {
      let v
      if (!nullish(v = bX && bX[i])) { return pX.color(v)|> toColor }
      if (!nullish(v = bY && bY[i])) { return pY.color(v)|> toColor }
      return null
    }
  }
  static maker([[bX, pX], [bY, pY]]) {
    return (_, i) => {
      let v
      if (!nullish(v = bX && bX[i])) {return pX.make(v)}
      if (!nullish(v = bY && bY[i])) {return pY.make(v)}
      return pX?.make(pX.na) ?? oneself
    }
  }
  static render([[bX, pX], [bY, pY]]) {
    return (n, i) => {
      let v
      if (!nullish(v = bX && bX[i])) {return pX.render(v, n)}
      if (!nullish(v = bY && bY[i])) {return pY.render(v, n)}
      return pX?.render(pX.na, n) ?? n
    }
  }
}