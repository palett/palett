import { isNumeric }    from '@typen/num-strict'
import { presetParser } from '../presetReader/presetParser'
import { hslToDye }     from './utils/hslToDye'
import { Projector }    from './utils/projector'

export function Dyer (valueBound, positivePreset, negativePreset) {
  const { colorant, zipper } = this
  const
    { max, min } = valueBound,
    x = presetParser(positivePreset),
    y = presetParser(negativePreset)
  // ({
  //   bound: { max, min },
  //   xdyeConf: { dif: max, min: 0 },
  //   ydyeConf: { dif: 0 - min, min: min },
  //   zipper: !!zipper
  // }) |> delogger
  if (max === min) {
    const prim = max >= 0 ? x : y
    const dye = hslToDye(prim.leap.min)
    return zipper
      ? colorant
        ? (v, n) => isNumeric(n) ? dye : prim.dye
        : (v, n) => isNumeric(n) ? v |> dye : v |> prim.dye
      : colorant
        ? v => isNumeric(v) ? dye : prim.dye
        : v => isNumeric(v) ? v |> dye : v |> prim.dye
  } else {
    const xdye = Projector({ dif: max, min: 0 }, x.leap)
    const ydye = Projector({ dif: 0 - min, min: min }, y.leap)
    return zipper
      ? colorant
        ? (v, n) => isNumeric(n) ? n >= 0 ? xdye(n) : ydye(n) : x.dye
        : (v, n) => isNumeric(n) ? n >= 0 ? v |> xdye(n) : v |> ydye(n) : v |> x.dye
      : colorant
        ? v => isNumeric(v) ? v >= 0 ? xdye(v) : ydye(v) : x.dye
        : v => isNumeric(v) ? v >= 0 ? v |> xdye(v) : v |> ydye(v) : v |> x.dye
  }
}
