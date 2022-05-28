import { duobound }                                  from '@aryth/bound-vector'
import { FRESH, PLANET, presetToFlat, presetToLeap } from '@palett/presets'
import { Projector }                                 from '@palett/projector'
import { stringValue }                               from '@spare/string'
import { isString }                                  from '@typen/literal'
import { nullish }                                   from '@typen/nullish'
import { isNumeric }                                 from '@typen/num-strict'
import { mapper, zipper }                            from '@vect/vector'

const oneself = x => x

const configX = { by: isNumeric, to: oneself, preset: FRESH }
const configY = { by: isString, to: stringValue, preset: PLANET }
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
export const fluoVecEdge = function (vec,
                                     x = configX,
                                     y = configY
) {
  if (!vec?.length) return ''
  const config = Object.assign(this ?? {}, { dye: x.preset |> presetToFlat }), { colorant } = config
  const [bvX, bvY] = this?.values ?? duobound(vec, x, y)
  const [dyeX, dyeY] = [bvX && Projector(bvX, presetToLeap(x.preset)), bvY && Projector(bvY, presetToLeap(y.preset))]
  if (colorant) {
    if (dyeX && dyeY) return zipper(bvX, bvY, DuoDyer.call(config, dyeX, dyeY))
    if (dyeX) return mapper(bvX, SoleDyer.call(config, dyeX))
    if (dyeY) return mapper(bvY, SoleDyer.call(config, dyeY))
    return vec
  } else {
    if (dyeX && dyeY) return mapper(vec, DuoRefDyer.call(config, { vec: bvX, dye: dyeX }, { vec: bvY, dye: dyeY }))
    if (dyeX) return mapper(vec, SoleRefDyer.call(config, { vec: bvX, dye: dyeX }))
    if (dyeY) return mapper(vec, SoleRefDyer.call(config, { vec: bvY, dye: dyeY }))
    return vec
  }
}

export const SoleDyer = function (dyeX) {
  const { dye } = this
  return (x) => !nullish(x) ? dyeX(x) : dye
}

export const DuoDyer = function (dyeX, dyeY) {
  const { dye } = this
  return (x, y) => !nullish(x) ? dyeX(x) : !nullish(x) ? dyeY(y) : dye
}

export const SoleRefDyer = function ({ vec: vx, dye: dx }, dye) {
  return (n, i) => {
    const x = vx[i]
    return !nullish(x) ? (n |> dx(x)) : (n |> dye)
  }
}

export const DuoRefDyer = function ({ vec: vx, dye: dx }, { vec: vy, dye: dy }, dye) {
  return (n, i) => {
    const x = vx[i], y = vy[i]
    return !nullish(x) ? (n |> dx(x)) : !nullish(y) ? (n |> dy(y)) : (n |> dye)
  }
}
