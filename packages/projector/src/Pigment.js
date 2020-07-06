import { PLANET, presetToFlat } from '@palett/presets'
import { isNumeric }            from '@typen/num-strict'
import { boundToLeap }          from './helpers/boundToLeap'
import { Projector }            from './Projector'

export const Pigment = (bound, preset = PLANET, effects) => {
  const vleap = boundToLeap(bound), prime = presetToFlat(preset)
  let dye = Projector(vleap, preset, effects)
  return x => isNumeric(x) ? x |> dye(x) : x |> prime
}