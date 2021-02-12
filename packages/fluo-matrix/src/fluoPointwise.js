import { duobound, solebound }                              from '@aryth/bound-matrix'
import { presetToFlat }                                     from '@palett/presets'
import { Projector, ProjectorFactory }                      from '@palett/projector'
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
 * @param {PresetAndConfig|PresetAndConfig[]} [presets]
 * @param {string[]} [effects]
 */
export const fluoPointwise = function (matrix, { presets = [], effects } = {}) {
  const [h, w] = size(matrix)
  if (!h || !w) return [[]]
  let colorant, mutate
  if (this) ({ colorant, mutate } = this)
  if (Array.isArray(presets)) {
    const [presetX, presetY] = presets
    const [bomatX, bomatY] = duobound(matrix, presets)
    const
      projX = ProjectorFactory.build(bomatX, presetX, effects),
      projY = ProjectorFactory.build(bomatY, presetY, effects)
    const mapper = mutate ? mutateFunc : mapperFunc
    return colorant
      ? mapper(matrix, Colorant(bomatX, projX, bomatY, projY, presetToFlat(presetX)))
      : mapper(matrix, Pigment(bomatX, projX, bomatY, projY, presetToFlat(presetY)))
  } else {
    /** @type {PresetAndConfig} */ const preset = presets
    const bomat = solebound(matrix, presets)
    const proj = ProjectorFactory.build(bomat, preset, effects)
    const mapper = mutate ? mutateFunc : mapperFunc
    return colorant
      ? mapper(matrix, Colorant(bomat, proj, undefined, undefined, presetToFlat(preset)))
      : mapper(matrix, Pigment(bomat, proj, undefined, undefined, presetToFlat(preset)))
  }
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