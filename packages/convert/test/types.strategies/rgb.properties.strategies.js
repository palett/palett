import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { RGB }               from './RGB'


const { lapse, result } = strategies({
  repeat: 1E+7,
  candidates: {
    tinsel: new RGB(195, 150, 77),
    citron: [ 223, 222, 155 ],
    cement: { r: 192, g: 185, b: 164 },
    // maroon: [ 131, 70, 85 ],
  } |> makeEmbedded,
  methods: {
    dev_get: rgb => rgb[0],
    rea_get: rgb => rgb.r,
    dev_set: rgb => rgb[0] = 0,
    rea_set: rgb => rgb.r = 0
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']