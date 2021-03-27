import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { PLANET, presetToFlat }              from '@palett/presets'
import { isNumeric }                         from '@typen/num-strict'
import { parseBound }                        from './parseBound'
import { ProjectorFactory }                  from './ProjectorFactory'

export const leverage = ([h, s, l], base) => [h / base, s / base, l / base]
export const scale = (x, min, lev, base, ceil) => keepCeil((keepFloor(x, min) - min) * lev + base, ceil)

/**
 *
 * @param {{[min]:number,[max]:number,[dif]:number}} bound
 * @param {{max:*,min:*}} preset
 * @param {string[]} [effects]
 * @returns {function(*):Function}
 */
export const Projector = (bound, preset, effects) =>
  projector.bind(ProjectorFactory.build(bound, preset, effects))

const projector = function (value) {
  const { fab, min, lev, base, na } = this
  return fab(na
    ? this.base
    : [
      scale(value, min, lev[0], base[0], 360),
      scale(value, min, lev[1], base[1], 100),
      scale(value, min, lev[2], base[2], 100)
    ]
  )
}

export const Colorant = (bound, preset = PLANET, effects) => {
  const projector = Projector(parseBound(bound), preset, effects)
  const defaultDye = presetToFlat(preset)
  return x => isNumeric(x) ? projector(x) : defaultDye
}

export const Pigment = (bound, preset = PLANET, effects) => {
  const projector = Projector(parseBound(bound), preset, effects)
  const defaultDye = presetToFlat(preset)
  return x => isNumeric(x) ? (x |> projector(x)) : (x |> defaultDye)
}


