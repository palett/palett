import { duobound }                                   from '@aryth/bound-vector'
import { Oneself, oneself }                           from '@ject/oneself'
import { Projector }                                  from '@palett/projector'
import { extractBound, presetToFlat }                 from '@palett/util-fluo'
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
 * @param {PresetAndConfig[]} configs
 * @param {string[]} effects
 */
export const fluoVector = function (vec, configs = [], effects) {
  if (!vec?.length) return []
  const colorant = this?.colorant, mutate = this?.mutate
  const [presetX, presetY] = configs
  const [vectorWithBoundX, vectorWithBoundY] = duobound(vec, configs)
  const
    dyeX = presetX ? Projector(extractBound(vectorWithBoundX), presetX, effects) : Oneself,
    dyeY = presetY ? Projector(extractBound(vectorWithBoundY), presetY, effects) : Oneself
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(vec, Colorant(vectorWithBoundX, dyeX, vectorWithBoundY, dyeY, presetX ? presetToFlat(presetX) : oneself))
    : mapper(vec, Pigment(vectorWithBoundX, dyeX, vectorWithBoundY, dyeY, presetY ? presetToFlat(presetY) : oneself))
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
