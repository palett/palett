import { PLANET }       from '@palett/presets'
import { presetToFlat } from '@palett/util-fluo'
import { isNumeric }    from '@typen/num-strict'
import { boundToLeap }  from './boundToLeap'
import { Projector }    from './projector'

export const Colorant = (bound, preset = PLANET) => {
  const vleap = boundToLeap(bound), prime = presetToFlat(preset)
  let dye = Projector(vleap, preset)
  return x => isNumeric(x) ? dye(x) : prime
}

export const Pigment = (bound, preset = PLANET) => {
  const vleap = boundToLeap(bound), prime = presetToFlat(preset)
  let dye = Projector(vleap, preset)
  return x => isNumeric(x) ? x |> dye(x) : x |> prime
}
