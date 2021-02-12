import { max as keepFloor, min as keepCeil } from '@aryth/comparer'
import { hexToHsl }                          from '@palett/convert'
import { DyeFactory }                        from '@palett/dye'
import { HSL }                               from '@palett/enum-color-space'
import { presetToLeap }                      from '@palett/presets'
import { boundToLeap }                       from './helpers/boundToLeap'
import { leverage }                          from './helpers/leverage'

const defaultPreset = { max: '#FFFFFF', min: '#FFFFFF', na: null }
export class ProjectorFactory {
  constructor(bound, preset, effects) {
    const leap = (preset ?? defaultPreset)|> presetToLeap
    this.factory = DyeFactory.build(HSL, effects)
    this.min = (bound = ((bound ?? {})|> boundToLeap)).min
    this.lever = leverage(leap.dif, bound.dif)
    this.base = leap.min
    this.default = preset?.na ? (preset.na|> hexToHsl) : null
    this.na = bound.dif === 0
  }
  static build(bound = {}, preset, effects) { return new ProjectorFactory(bound, preset, effects) }
  render(value, text) { return this.factory(this.project(value))(text) }
  make(value) { return this.factory(this.project(value)) }
  project(value) {
    if (isNaN(value)) return this.default
    if (this.na) return this.base
    const { min, lever: [levH, levS, levL], base: [minH, minS, minL] } = this
    return [
      scale(value, min, levH, minH, 360),
      scale(value, min, levS, minS, 100),
      scale(value, min, levL, minL, 100)
    ]
  }
}


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
  const { factory, min, lever: [levH, levS, levL], base: [minH, minS, minL], na } = this
  return factory(na
    ? this.base
    : [
      scale(value, min, levH, minH, 360),
      scale(value, min, levS, minS, 100),
      scale(value, min, levL, minL, 100)
    ]
  )
}

const scale = (x, min, lever, base, ceil) => keepCeil((keepFloor(x, min) - min) * lever + base, ceil)
