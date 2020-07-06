import { JUNGLE }                                  from '@palett/presets'
import { mapper }                                  from '@vect/vector-mapper'
import { Chrono }                                  from 'elprimero'
import { blendDye, isNum, leverage, presetToFlat } from '../..'
import { Projector }                               from '../../src/dyer/utils/projector'
import { presetToLeap }                            from '../../src/presetReader/presetToLeap'

export const dyeMorph = (ar, { map, valueLeap, colorLeap, dye, colorant }) => {
  const
    { min: minV, dif: difV } = valueLeap,
    { min: minHSL, dif: difHSL } = colorLeap,
    leverHSL = leverage(difHSL, difV)
  return colorant
    ? map(ar, x => isNum(x) ? blendDye(x, minV, leverHSL, minHSL) : dye)
    : map(ar, x => isNum(x) ? x |> blendDye(x, minV, leverHSL, minHSL) : x |> dye)
}

export const dyeMorphDev = (ar, { map, valueLeap, colorLeap, dye, colorant }) => {
  const toDye = Projector(valueLeap, colorLeap)
  return colorant
    ? map(ar, x => isNum(x) ? toDye(x) : dye)
    : map(ar, x => isNum(x) ? x |> toDye(x) : x |> dye)
}

const valueLeap = { min: 1, dif: 9 }
const colorLeap = JUNGLE |> presetToLeap
const dye = JUNGLE |> presetToFlat
const { lapse, result } = Chrono.strategies({
  repeat: 1E+5,
  paramsList: {
    simple: [[1, 2, 3, 4, 5, 6, 7]],
    reverse: [[7, 6, 5, 4, 3, 2, 1]],
  },
  funcList: {
    stable: ar => ar.map(x => x),
    dyeMorphStable: ar => dyeMorph(ar, { map: mapper, valueLeap, colorLeap, dye }),
    dyeMorphDev: ar => dyeMorphDev(ar, { map: mapper, valueLeap, colorLeap, dye }),
  }
})
'lapse' |> console.log
lapse |> decoCrostab |> says['lapse']
'' |> console.log
'result' |> console.log
result |> decoCrostab |> says['result']
