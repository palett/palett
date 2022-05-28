import { duobound }                    from '@aryth/bound-vector'
import { FRESH, PLANET, presetToLeap } from '@palett/presets'
import { Projector }                   from '@palett/projector'
import { stringValue }                  from '@spare/string'
import { isString }                     from '@typen/literal'
import { nullish }                      from '@typen/nullish'
import { isNumeric }                    from '@typen/num-strict'
import { Duozipper, mapper, Trizipper } from '@vect/vector'
import { zipper }                       from '@vect/vector-zipper'

const oneself = x => x
/**
 *
 * @param vec
 * @typedef {Object} PalettProjectConfig
 * @typedef {Function} PalettProjectConfig.by
 * @typedef {Function} PalettProjectConfig.to
 * @typedef {Object} PalettProjectConfig.preset
 * @param {PalettProjectConfig} x
 * @param {PalettProjectConfig} y
 */
export const fluoVecFut = function (vec,
  x = { by: isNumeric, to: oneself, preset: FRESH },
  y = { by: isString, to: stringValue, preset: PLANET }) {
  if (!vec?.length) return ''
  const
    config = Object.assign(this ?? {}, { dye: x.preset |> presetToFlat }),
    { colorant } = config
  const [bvX, bvY] = this?.values ?? duobound(vec, x, y)
  const [dyeX, dyeY] = [bvX && Projector(bvX, presetToLeap(x.preset)), bvY && Projector(bvY, presetToLeap(y.preset))]
  if (colorant) {
    if (dyeX && dyeY) return Duozipper(DuoDyer.call(config, dyeX, dyeY))(vec, bvX, bvY)
    if (dyeX) return mapper(bvX, SoleDyer.call(config, dyeX))
    if (dyeY) return mapper(bvY, SoleDyer.call(config, dyeY))
    return vec
  } else {
    if (dyeX && dyeY) return Trizipper(ZippedDuoDyer.call(config, dyeX, dyeY))(vec, bvX, bvY)
    if (dyeX) return zipper(vec, bvX, ZippedSoleDyer.call(config, dyeX))
    if (dyeY) return zipper(vec, bvY, ZippedSoleDyer.call(config, dyeY))
    return vec
  }
}

export const SoleDyer = function (dyeX) {
  const { dye } = this
  return (x) => !nullish(x) ? dyeX(x) : dye
}

export const ZippedSoleDyer = function (dyeX) {
  const { dye } = this
  return (n, x) => !nullish(x) ? (n |> dyeX(x)) : (n |> dye)
}

export const DuoDyer = function (dyeX, dyeY) {
  const { dye } = this
  return (x, y) => !nullish(x) ? dyeX(x) : !nullish(x) ? dyeY(y) : dye
}

export const ZippedDuoDyer = function (dyeX, dyeY) {
  const { dye } = this
  return (n, x, y) => !nullish(x) ? (n |> dyeX(x)) : !nullish(y) ? (n |> dyeY(y)) : (n |> dye)
}
