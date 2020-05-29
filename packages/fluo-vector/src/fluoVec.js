import { duobound }                                   from '@aryth/bound-vector'
import { FRESH, PLANET }                              from '@palett/presets'
import { Projector }                                  from '@palett/projector'
import { presetToFlat }                               from '@palett/util-fluo'
import { nullish }                                    from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param vec
 * @param {PalettProjectConfig[]} presets
 */
export const fluoVec = function (vec, presets = []) {
  if (!vec?.length) return []
  const
    colorant = this?.colorant,
    mutate = this?.mutate
  const [x, y] = presets
  const
    pX = x?.preset ?? FRESH,
    pY = y?.preset ?? PLANET
  const [bX, bY] = duobound(vec, presets)
  const
    dX = Projector(bX, pX),
    dY = Projector(bY, pY)
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(vec, Colorant(bX, dX, bY, dY, presetToFlat(pX)))
    : mapper(vec, Pigment(bX, dX, bY, dY, presetToFlat(pY)))
}

export const Colorant = function (bX, dX, bY, dY, dye) {
  return (_, i) => {
    const x = bX && bX[i], y = bY && bY[i]
    return !nullish(x) ? dX(x) : !nullish(y) ? dY(y) : dye
  }
}

export const Pigment = function (bX, dX, bY, dY, dye) {
  return (n, i) => {
    const x = bX && bX[i], y = bY && bY[i]
    return !nullish(x) ? (n |> dX(x)) : !nullish(y) ? (n |> dY(y)) : (n |> dye)
  }
}
