import { min as keepCeil, max as keepFloor } from '@aryth/comparer'
import { PLANET, presetToFlat }              from '@palett/presets'
import { ProjectorConfig }                   from '@palett/projector-config'
import { isNumeric }                         from '@typen/num-strict'
import { parseBound }                        from './parseBound'

export const leverage = ([h, s, l], min) => [h / min, s / min, l / min]
export const scale = (x, lo, lev, min, ceil) => keepCeil((keepFloor(x, lo) - lo) * lev + min, ceil)
export const _project = function (value) {
  const { lo, lev, min } = this
  return [
    scale(value, lo, lev[0], min[0], 360),
    scale(value, lo, lev[1], min[1], 100),
    scale(value, lo, lev[2], min[2], 100)
  ]
}
/**
 *
 * @param {{[lo]:number,[max]:number,[dif]:number}} bound
 * @param {{max:string,min:string,na:string,effects?:string[]}} preset
 * @returns {function(*):Function}
 */
export const Projector = (bound, preset) =>
  projector.bind(ProjectorConfig.fromHEX(bound, preset))

export const projector = function (value) {
  return !isNumeric(value)
    ? this.fab(this.min)
    : this.fab(_project.call(this, value))
}


export const Colorant = (bound, preset = PLANET) => {
  const core = ProjectorConfig.fromHEX(bound, preset)
  const dyeNAp = core.dyeNAp
  return x => isNumeric(x) ? core.fab(core.project(x)) : dyeNAp
}

export const Pigment = (bound, preset = PLANET) => {
  const core = ProjectorConfig.fromHEX(bound, preset)
  const dyeNAp = core.dyeNAp
  return x => isNumeric(x) ? core.fab(core.project(x))(x) : dyeNAp(x)
}


