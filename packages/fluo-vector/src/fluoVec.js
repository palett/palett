import { duobound }                                   from '@aryth/bound-vector'
import { FRESH, PLANET }                              from '@palett/presets'
import { Projector }                                  from '@palett/projector/src/projector'
import { presetToFlat, presetToLeap }                 from '@palett/util-fluo'
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
export const fluoVec = function (vec, [x = {}, y = {}] = []) {
  if (!vec?.length) return ''
  const { colorant = false, mutate = false, values } = this ?? {}
  const { preset: prX = FRESH } = x, { preset: prY = PLANET } = y
  const [bvX, bvY] = values ?? duobound(vec, [x, y])
  const [dyeX, dyeY] = [bvX && Projector(bvX, presetToLeap(prX)), bvY && Projector(bvY, presetToLeap(prY))]
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(vec, Colorant({ vec: bvX, dye: dyeX }, { vec: bvY, dye: dyeY }, prX |> presetToFlat))
    : mapper(vec, Pigment({ vec: bvX, dye: dyeX }, { vec: bvY, dye: dyeY }, prY |> presetToFlat))
}

export const Colorant = function ({ vec: vx, dye: dx }, { vec: vy, dye: dy }, dye) {
  return (_, i) => {
    const x = vx && vx[i], y = vy && vy[i]
    return !nullish(x) ? (dx(x)) : !nullish(y) ? (dy(y)) : (dye)
  }
}

export const Pigment = function ({ vec: vx, dye: dx }, { vec: vy, dye: dy }, dye) {
  return (n, i) => {
    const x = vx && vx[i], y = vy && vy[i]
    return !nullish(x) ? (n |> dx(x)) : !nullish(y) ? (n |> dy(y)) : (n |> dye)
  }
}
