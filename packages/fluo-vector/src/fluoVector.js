import { duobound, solebound }                        from '@aryth/bound-vector'
import { hslToHex }                                   from '@palett/convert'
import { ProjectorFactory }                           from '@palett/projector'
import { nullish }                                    from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector-mapper'

/**
 *
 * @typedef {Object} PresetAndConfig
 * @typedef {string} PresetAndConfig.max
 * @typedef {string} PresetAndConfig.min
 * @typedef {string} PresetAndConfig.na
 * @typedef {Function} PresetAndConfig.mapper
 * @typedef {Function} PresetAndConfig.filter
 *
 * @param vec
 * @param {PresetAndConfig|PresetAndConfig[]} [presets]
 * @param {string[]} [effects]
 */
export const fluoVector = function (vec, { presets, effects } = {}) {
  if (!vec?.length) return []
  const colorant = this?.colorant, mutate = this?.mutate
  const [[bovecX, projX], [bovecY, projY]] = makeProjector(vec, presets, effects)
  const mapper = mutate ? mutateFunc : mapperFunc
  if (colorant === 'hex') return mapper(vec, PointColorFactory.color(bovecX, projX, bovecY, projY))
  return colorant
    ? mapper(vec, PointColorFactory.maker(bovecX, projX, bovecY, projY))
    : mapper(vec, PointColorFactory.render(bovecX, projX, bovecY, projY))
}

const makeProjector = (vec, presets, effects) => {
  if (Array.isArray(presets)) {
    const [presetX, presetY] = presets
    const [bovecX, bovecY] = duobound(vec, presets)
    const
      projX = ProjectorFactory.build(bovecX, presetX, effects),
      projY = ProjectorFactory.build(bovecY, presetY, effects)
    return [[bovecX, projX], [bovecY, projY]]
  } else {
    const preset = presets
    const bovec = solebound(vec, preset)
    const
      proj = ProjectorFactory.build(bovec, preset, effects)
    return [[bovec, proj], [undefined, undefined]]
  }
}

export class PointColorFactory {
  static color(bX, pX, bY, pY) {
    function toColor(some) { return some ? some|> hslToHex : null }
    return (_, i) => {
      let v
      if (!nullish(v = bX && bX[i])) {return pX.color(v)|> toColor}
      if (!nullish(v = bY && bY[i])) {return pY.color(v)|> toColor}
      return null
    }
  }
  static maker(bX, pX, bY, pY) {
    return (_, i) => {
      let v
      if (!nullish(v = bX && bX[i])) {return pX.make(v)}
      if (!nullish(v = bY && bY[i])) {return pY.make(v)}
      return pX.make(pX.na)
    }
  }
  static render(bX, pX, bY, pY) {
    return (n, i) => {
      let v
      if (!nullish(v = bX && bX[i])) {return pX.render(v, n)}
      if (!nullish(v = bY && bY[i])) {return pY.render(v, n)}
      return pX.render(pX.na, n)
    }
  }
}


const extractBound = objectWithBound => {
  return objectWithBound ? {
    max: objectWithBound.max,
    min: objectWithBound.min
  } : null
}
