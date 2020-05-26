import { PLANET }                                         from '@palett/presets'
import { BlendDye, hslToDye, presetToFlat, presetToLeap } from '@palett/util-fluo'
import { isNumeric }                                      from '@typen/num-strict'
import { boundToLeap }                                    from '../utils/boundToLeap'

export const FluoNumber = (bound, preset = PLANET, colorant = true) => {
  const vleap = boundToLeap(bound), cleap = presetToLeap(preset), prime = presetToFlat(preset)
  let dye
  return vleap.dif && cleap.dif.some(n => !!n)
    ? (dye = BlendDye(vleap, cleap),
      colorant
        ? x => isNumeric(x) ? dye(x) : prime
        : x => isNumeric(x) ? x |> dye(x) : x |> prime)
    : (dye = cleap.min |> hslToDye,
      colorant
        ? x => isNumeric(x) ? dye : prime
        : x => isNumeric(x) ? x |> dye : x |> prime)
}
