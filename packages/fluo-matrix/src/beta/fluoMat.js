import { duobound }                                         from '@aryth/bound-matrix'
import { FRESH, PLANET }                                    from '@palett/presets'
import { Projector }                                        from '@palett/projector'
import { presetToFlat, presetToLeap }                       from '@palett/util-fluo'
import { nullish }                                          from '@typen/nullish'
import { mapper as mapperFunc, mutate as mutateFunc, size } from '@vect/matrix'

/**
 *
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.filter
 * @typedef {Function} PalettProjectConfig.mapper
 * @typedef {Object} PalettProjectConfig.preset
 *
 * @param mat
 * @param {PalettProjectConfig} x
 * @param {PalettProjectConfig} y
 */
export const fluoMat = function (mat, x = {}, y = {}) {
  const [h, w] = size(mat)
  if (!h || !w) return ''
  const { colorant = false, mutate = false, values } = this ?? {}
  const { preset: prX = FRESH } = x, { preset: prY = PLANET } = y
  const [bvX, bvY] = values ?? duobound(mat, x, y)
  const [dyeX, dyeY] = [bvX && Projector(bvX, presetToLeap(prX)), bvY && Projector(bvY, presetToLeap(prY))]
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(mat, Colorant({ mat: bvX, dye: dyeX }, { mat: bvY, dye: dyeY }, prX |> presetToFlat))
    : mapper(mat, Pigment({ mat: bvX, dye: dyeX }, { mat: bvY, dye: dyeY }, prY |> presetToFlat))
}

export const Colorant = function ({ mat: vx, dye: dx }, { mat: vy, dye: dy }, dye) {
  return (_, i, j) => {
    const x = vx && vx[i][j], y = vy && vy[i][j]
    return !nullish(x) ? dx(x) : !nullish(y) ? dy(y) : dye
  }
}

export const Pigment = function ({ mat: vx, dye: dx }, { mat: vy, dye: dy }, dye) {
  return (n, i, j) => {
    const x = vx && vx[i][j], y = vy && vy[i][j]
    return !nullish(x) ? (n |> dx(x)) : !nullish(y) ? (n |> dy(y)) : (n |> dye)
  }
}
