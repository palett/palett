import { presetParser } from '../presetReader/presetParser'
import { Projector }    from './utils/projector'

export function Duodyer (confX, confY) {
  const { colorant } = this
  const
    { values: valuesX, preset: presetX } = confX,
    { values: valuesY, preset: presetY } = confY,
    x = presetParser(presetX),
    y = presetParser(presetY)
  // ({
  //   bound: { max, min },
  //   xdyeConf: { dif: max, min: 0 },
  //   ydyeConf: { dif: 0 - min, min: min },
  //   zipper: !!zipper
  // }) |> delogger
  const xdye = Projector(valuesX, x.leap)
  const ydye = Projector(valuesY, y.leap)
  return colorant
    ? (_, x, y) => x ? xdye(x) : y ? ydye(y) : x.dye
    : (n, x, y) => x ? (n |> xdye(x)) : y ? (n |> ydye(y)) : (n |> x.dye)
}
