import { PLANET, presetToFlat } from '@palett/presets'
import { isNumeric }            from '@typen/num-strict'
import { boundToLeap }          from './src/helpers/boundToLeap'
import { Projector }            from './src/Projector'


export { Projector }        from './src/Projector'
export { ProjectorFactory } from './src/Projector'


export const Colorant = (bound, preset = PLANET, effects) => {
  const projector = Projector(boundToLeap(bound), preset, effects)
  const defaultDye = presetToFlat(preset)
  return x => isNumeric(x) ? projector(x) : defaultDye
}

export const Pigment = (bound, preset = PLANET, effects) => {
  const projector = Projector(boundToLeap(bound), preset, effects)
  const defaultDye = presetToFlat(preset)
  return x => isNumeric(x) ? (x |> projector(x)) : (x |> defaultDye)
}