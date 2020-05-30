import { duobound }                                         from '@aryth/bound-matrix'
import { FRESH, PLANET }                                    from '@palett/presets'
import { Projector }                                        from '@palett/projector'
import { presetToFlat }                                     from '@palett/util-fluo'
import { nullish }                                          from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc, size } from '@vect/matrix'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param matrix
 * @param {PalettProjectConfig[]} [presets]
 * @param {string[]} [effects]
 */
export const fluoMat = function (matrix, presets = [], effects) {
  const [h, w] = size(matrix)
  if (!h || !w) return [[]]
  const
    colorant = this?.colorant,
    mutate = this?.mutate
  const [x, y] = presets
  const
    pX = x?.preset ?? FRESH,
    pY = y?.preset ?? PLANET
  const [bX, bY] = duobound(matrix, [x, y])
  const
    dX = Projector(bX, pX, effects),
    dY = Projector(bY, pY, effects)
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(matrix, Colorant(bX, dX, bY, dY, presetToFlat(pX)))
    : mapper(matrix, Pigment(bX, dX, bY, dY, presetToFlat(pY)))
}

export const Colorant = function (bX, dX, bY, dY, dye) {
  return (_, i, j) => {
    const x = bX && bX[i][j], y = bY && bY[i][j]
    return !nullish(x) ? dX(x) : !nullish(y) ? dY(y) : dye
  }
}

export const Pigment = function (bX, dX, bY, dY, dye) {
  return (n, i, j) => {
    const x = bX && bX[i][j], y = bY && bY[i][j]
    return !nullish(x) ? (n |> dX(x)) : !nullish(y) ? (n |> dY(y)) : (n |> dye)
  }
}

// export const BodiedProjector = (bound, preset) => {
//   return { body: bound, dye: Projector(bound, preset) }
// }
//
// export const DuoProjector = (bounds, presets) => {
//   const [bX, bY] = bounds
//   const [prX, prY] = presets
//   return [Projector(bX, prX), Projector(bY, prY)]
// }
