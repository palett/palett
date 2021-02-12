import { duobound, solebound }                        from '@aryth/bound-vector'
import { presetToFlat }                               from '@palett/presets'
import { Projector, ProjectorFactory }                from '@palett/projector'
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
  return colorant
    ? mapper(vec, PointColorFactory.maker(bovecX, projX, bovecY, projY))
    : mapper(vec, PointColorFactory.renderer(bovecX, projX, bovecY, projY))
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
  static maker(bX, pX, bY, pY) {
    return (_, i) => {
      let x, y
      return !nullish(x = bX && bX[i]) ? pX.make(x) :
        !nullish(y = bY && bY[i]) ? pY.make(y) :
          pX.make(pX.default)
    }
  }
  static renderer(bX, pX, bY, pY) {
    return (n, i) => {
      let x, y
      return !nullish(x = bX && bX[i]) ? pX.render(x, n) :
        !nullish(y = bY && bY[i]) ? pY.render(y, n) :
          pX.render(pX.default, n)
    }
  }
}

export const Colorant = function (bX, pX, bY, pY) {
  return (_, i) => {
    let x, y
    return !nullish(x = bX && bX[i]) ? pX.make(x) :
      !nullish(y = bY && bY[i]) ? pY.make(y) :
        pX.make(pX.default)
  }
}

export const Pigment = function (bX, pX, bY, pY) {
  return (n, i) => {
    let x, y
    return !nullish(x = bX && bX[i]) ? pX.render(x, n) :
      !nullish(y = bY && bY[i]) ? pY.render(y, n) :
        pX.render(pX.default, n)
  }
}


const extractBound = objectWithBound => {
  return objectWithBound ? {
    max: objectWithBound.max,
    min: objectWithBound.min
  } : null
}
