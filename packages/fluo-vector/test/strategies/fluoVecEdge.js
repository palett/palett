import { duobound }                                   from '@aryth/bound-vector'
import { FRESH, PLANET, presetToFlat, presetToLeap }  from '@palett/presets'
import { Projector }                                  from '@palett/projector'
import { stringValue }                                from '@spare/string'
import { isString }                                   from '@typen/literal'
import { nullish }                                    from '@typen/nullish'
import { isNumeric }                                  from '@typen/num-strict'
import { mapper as mapperFunc, mutate as mutateFunc } from '@vect/vector'

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
  const { colorant = false, mutate = false } = this ?? {}
  const [bvX, bvY] = this?.values ?? duobound(vec, x, y)
  const [dyeX, dyeY] = [bvX && Projector(bvX, presetToLeap(x.preset)), bvY && Projector(bvY, presetToLeap(y.preset))]
  const mapper = mutate ? mutateFunc : mapperFunc
  return colorant
    ? mapper(vec, Colorant({ vec: bvX, dye: dyeX }, { vec: bvY, dye: dyeY }, x.preset |> presetToFlat))
    : mapper(vec, RefDyer({ vec: bvX, dye: dyeX }, { vec: bvY, dye: dyeY }, x.preset |> presetToFlat))
}

export const Colorant = function ({ vec: vx, dye: dx }, { vec: vy, dye: dy }, dye) {
  return (_, i) => {
    const x = vx && vx[i], y = vy && vy[i]
    return !nullish(x) ? (dx(x)) : !nullish(y) ? (dy(y)) : (dye)
  }
}

export const RefDyer = function ({ vec: vx, dye: dx }, { vec: vy, dye: dy }, dye) {
  return (n, i) => {
    const x = vx && vx[i], y = vy && vy[i]
    return !nullish(x) ? (n |> dx(x)) : !nullish(y) ? (n |> dy(y)) : (n |> dye)
  }
}
