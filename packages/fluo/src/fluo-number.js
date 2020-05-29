import { PLANET }            from '@palett/presets'
import { Colorant, Pigment } from '@palett/projector'

export const FluoNumber = (bound, preset = PLANET, colorant = true) => {
  return colorant
    ? Colorant(bound, preset)
    : Pigment(bound, preset)
}
