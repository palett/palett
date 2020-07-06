import { duobound }                                         from '@aryth/bound-matrix'
import { presetToFlat }                                     from '@palett/presets'
import { Projector }                                        from '@palett/projector'
import { nullish }                                          from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc, size } from '@vect/matrix'

/**
 *
 * @typedef {Object} PresetAndConfig
 * @typedef {string} PresetAndConfig.max
 * @typedef {string} PresetAndConfig.min
 * @typedef {string} PresetAndConfig.na
 * @typedef {Function} PresetAndConfig.filter
 * @typedef {Function} PresetAndConfig.mapper
 *
 * @param matrix
 * @param {PresetAndConfig[]} [configs]
 * @param {string[]} [effects]
 */
export const fluoPointwise = function (matrix, configs = [], effects) {
  const [h, w] = size(matrix)
  if (!h || !w) return [[]]
  const colorant = this?.colorant, mutate = this?.mutate
  const [presetX, presetY] = configs
  const [matrixWithBoundX, matrixWithBoundY] = duobound(matrix, configs)
  const
    dyeX = Projector(extractBound(matrixWithBoundX), presetX, effects),
    dyeY = Projector(extractBound(matrixWithBoundY), presetY, effects)
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(matrix, Colorant(matrixWithBoundX, dyeX, matrixWithBoundY, dyeY, presetToFlat(presetX)))
    : mapper(matrix, Pigment(matrixWithBoundX, dyeX, matrixWithBoundY, dyeY, presetToFlat(presetY)))
}

export const Colorant = function (bX, dX, bY, dY, dye) {
  return (_, i, j) => {
    let x, y
    return !nullish(x = bX && bX[i][j]) ? dX(x) : !nullish(y = bY && bY[i][j]) ? dY(y) : dye
  }
}

export const Pigment = function (bX, dX, bY, dY, dye) {
  return (n, i, j) => {
    let x, y
    return !nullish(x = bX && bX[i][j]) ? (n |> dX(x)) : !nullish(y = bY && bY[i][j]) ? (n |> dY(y)) : (n |> dye)
  }
}

const extractBound = objectWithBound => {
  return objectWithBound ? {
    max: objectWithBound.max,
    min: objectWithBound.min
  } : null
}
