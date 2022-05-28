import { boundaries }                                 from '@aryth/bound-vector'
import { oneself }                                    from '@ject/oneself'
import { hslToHex }                                   from '@palett/convert'
import { COLOR, MAKER, RENDER }                       from '@palett/enum-colorant-modes'
import { ProjectorFactory }                           from '@palett/projector-factory'
import { nullish }                                    from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector-mapper'

/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.max
 * @typedef {string} Preset.min
 * @typedef {string} Preset.na
 * @typedef {?string[]} Preset.effects
 * @typedef {?Function} Preset.by
 * @typedef {?Function} Preset.to
 *
 * @param {*[]} vec
 * @param {Preset[]} presets
 * @returns {*[]}
 */
export const fluoVector = function (vec, presets) {
  if (!vec?.length) return []
  const projectorCollection = _toProjectorCollection(vec, presets)
  const mapper = this?.mutate ? mutateFunc : mapperFunc
  switch (this?.colorant) {
    case COLOR:
      return mapper(vec, ColorFactory.color(projectorCollection))
    case MAKER:
      return mapper(vec, ColorFactory.maker(projectorCollection))
    case RENDER:
    default:
      return mapper(vec, ColorFactory.render(projectorCollection))
  }
}

const _toProjectorCollection = (vec, presetCollection = []) => {
  const [confX, confY] = presetCollection
  const [vecX, vecY] = boundaries(vec, presetCollection)
  const [projX, projY] = [ProjectorFactory.fromHEX(vecX, confX), ProjectorFactory.fromHEX(vecY, confY)]
  return [[vecX, projX], [vecY, projY]]
}

export class ColorFactory {
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
      if (!nullish(v = bX && bX[i])) { return pX.make(v) }
      if (!nullish(v = bY && bY[i])) { return pY.make(v) }
      return (pX || pY)?.make(pX.nap) ?? oneself
    }
  }
  static render([[bX, pX], [bY, pY]]) {
    return (n, i) => {
      let v
      if (!nullish(v = bX && bX[i])) { return pX.render(v, n) }
      if (!nullish(v = bY && bY[i])) { return pY.render(v, n) }
      return (pX || pY)?.render(pX.nap, n) ?? n
    }
  }
}