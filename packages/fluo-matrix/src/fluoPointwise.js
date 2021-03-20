import { duobound, solebound }                              from '@aryth/bound-matrix'
import { hslToHex }                                         from '@palett/convert'
import { ProjectorFactory }                                 from '@palett/projector'
import { nullish }                                          from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc, size } from '@vect/matrix'

/**
 * @typedef {Object} FluoSetting
 * @typedef {{min:string,max:string,na:string}} FluoSetting.preset
 * @typedef {string[]} FluoSetting.effects
 * @typedef {Function} FluoSetting.filter
 * @typedef {Function} FluoSetting.mapper
 *
 * @param {*[][]} matrix
 * @param {FluoSetting[]} configs
 * @returns {*[][]}
 */
export const fluoPointwise = function (matrix, configs) {
  const [h, w] = size(matrix)
  if (!h || !w) return [[]]
  const colorant = this?.colorant, mutate = this?.mutate
  const [[bovecX, projX], [bovecY, projY]] = makeProjector(matrix, configs)
  const mapper = mutate ? mutateFunc : mapperFunc
  if (colorant === 'hex') return mapper(matrix, PointColorFactory.color(bovecX, projX, bovecY, projY))
  return colorant
    ? mapper(matrix, PointColorFactory.maker(bovecX, projX, bovecY, projY))
    : mapper(matrix, PointColorFactory.render(bovecX, projX, bovecY, projY))
}

const makeProjector = (matrix, configs) => {
  if (configs.length >= 2) {
    const [bovecX, bovecY] = duobound(matrix, configs)
    const [confX, confY] = configs
    const
      projX = ProjectorFactory.build(bovecX, confX),
      projY = ProjectorFactory.build(bovecY, confY)
    return [[bovecX, projX], [bovecY, projY]]
  }
  if (configs.length === 1) {
    const [conf] = configs
    const bovec = solebound(matrix, conf)
    const proj = ProjectorFactory.build(bovec, conf)
    return [[bovec, proj], [undefined, undefined]]
  }
  return [[undefined, undefined], [undefined, undefined]]
  // if (Array.isArray(presets)) {
  //   const [presetX, presetY] = presets
  //   const [bovecX, bovecY] = duobound(matrix, presets)
  //   const
  //     projX = ProjectorFactory.build(bovecX, presetX, effects),
  //     projY = ProjectorFactory.build(bovecY, presetY, effects)
  //   return [[bovecX, projX], [bovecY, projY]]
  // } else {
  //   const preset = presets
  //   const bovec = solebound(matrix, preset)
  //   const proj = ProjectorFactory.build(bovec, preset, effects)
  //   return [[bovec, proj], [undefined, undefined]]
  // }
}

export class PointColorFactory {
  static color(bX, pX, bY, pY) {
    function toColor(some) { return some ? some|> hslToHex : null }
    return (_, i, j) => {
      let v
      if (!nullish(v = bX && bX[i][j])) {return pX.color(v)|> toColor}
      if (!nullish(v = bY && bY[i][j])) {return pY.color(v)|> toColor}
      return null
    }
  }
  static maker(bX, pX, bY, pY) {
    return (_, i, j) => {
      let v
      if (!nullish(v = bX && bX[i][j])) {return pX.make(v)}
      if (!nullish(v = bY && bY[i][j])) {return pY.make(v)}
      return pX.make(pX.na)
    }
  }
  static render(bX, pX, bY, pY) {
    return (n, i, j) => {
      let v
      if (!nullish(v = bX && bX[i][j])) {return pX.render(v, n)}
      if (!nullish(v = bY && bY[i][j])) {return pY.render(v, n)}
      return pX.render(pX.na, n)
    }
  }
}