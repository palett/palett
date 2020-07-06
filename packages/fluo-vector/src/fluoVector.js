import { duobound, solebound }                        from '@aryth/bound-vector'
import { presetToFlat }                               from '@palett/presets'
import { Projector }                                  from '@palett/projector'
import { nullish }                                    from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector'

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
 * @param {PresetAndConfig|PresetAndConfig[]} opts
 * @param {string[]} effects
 */
export const fluoVector = function (vec, opts = [], effects) {
  if (!vec?.length) return []
  const colorant = this?.colorant, mutate = this?.mutate
  if (Array.isArray(opts)) {
    const [presetX, presetY] = opts
    const [vectorWithBoundX, vectorWithBoundY] = duobound(vec, opts)
    const
      dyeX = Projector(extractBound(vectorWithBoundX), presetX, effects),
      dyeY = Projector(extractBound(vectorWithBoundY), presetY, effects)
    const mapper = mutate ? mutateFunc : mapperFunc
    return colorant
      ? mapper(vec, Colorant(vectorWithBoundX, dyeX, vectorWithBoundY, dyeY, presetToFlat(presetX)))
      : mapper(vec, Pigment(vectorWithBoundX, dyeX, vectorWithBoundY, dyeY, presetToFlat(presetY)))
  } else {
    /** @type {PresetAndConfig} */ const preset = opts
    const vectorWithBound = solebound(vec, opts)
    const dye = Projector(extractBound(vectorWithBound), preset, effects)
    const mapper = mutate ? mutateFunc : mapperFunc
    return colorant
      ? mapper(vec, Colorant(vectorWithBound, dye, undefined, undefined, presetToFlat(preset)))
      : mapper(vec, Pigment(vectorWithBound, dye, undefined, undefined, presetToFlat(preset)))
  }

}

export const Colorant = function (bX, dX, bY, dY, dye) {
  return (_, i) => {
    let x, y
    return !nullish(x = bX && bX[i]) ? dX(x) : !nullish(y = bY && bY[i]) ? dY(y) : dye
  }
}

export const Pigment = function (bX, dX, bY, dY, dye) {
  return (n, i) => {
    let x, y
    return !nullish(x = bX && bX[i]) ? (n |> dX(x)) : !nullish(y = bY && bY[i]) ? (n |> dY(y)) : (n |> dye)
  }
}

const extractBound = objectWithBound => {
  return objectWithBound ? {
    max: objectWithBound.max,
    min: objectWithBound.min
  } : null
}
