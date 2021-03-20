import { duobound, solebound }                        from '@aryth/bound-vector'
import { hslToHex }                                   from '@palett/convert'
import { COLOR, MAKER, RENDER }                       from '@palett/enum-colorant-modes'
import { ProjectorFactory }                           from '@palett/projector'
import { nullish }                                    from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector-mapper'

/**
 * @typedef {Object} FluoSetting
 * @typedef {{min:string,max:string,na:string}} FluoSetting.preset
 * @typedef {string[]} FluoSetting.effects
 * @typedef {Function} FluoSetting.filter
 * @typedef {Function} FluoSetting.mapper
 *
 * @param {*[]} vec
 * @param {FluoSetting[]} configs
 * @returns {*[]}
 */
export const fluoVector = function (vec, configs) {
  if (!vec?.length) return []
  const projectorSet = makeProjector(vec, configs)
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

const makeProjector = (vec, configs) => {
  if (configs.length >= 2) {
    const [confX, confY] = configs
    const [vecX, vecY] = duobound(vec, configs)
    const [projX, projY] = [ProjectorFactory.build(vecX, confX), ProjectorFactory.build(vecY, confY)]
    return [[vecX, projX], [vecY, projY]]
  }
  if (configs.length === 1) {
    const [confX] = configs
    const vecX = solebound(vec, confX)
    const projX = ProjectorFactory.build(vecX, confX)
    return [[vecX, projX], [undefined, undefined]]
  }
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
      return pX.make(pX.na)
    }
  }
  static render([[bX, pX], [bY, pY]]) {
    return (n, i) => {
      let v
      if (!nullish(v = bX && bX[i])) {return pX.render(v, n)}
      if (!nullish(v = bY && bY[i])) {return pY.render(v, n)}
      return pX.render(pX.na, n)
    }
  }
}