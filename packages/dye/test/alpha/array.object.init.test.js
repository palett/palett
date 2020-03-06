import { Chrono } from 'elprimero'
import { CrosTabX } from 'xbrief'

const { lapse, result } = Chrono.strategies({
  repeat: 2E+7,
  paramsList: {
    simple: [],
    misc: [],
  },
  funcList: {
    bench: x => x,
    ob: x => ({}),
    ar: x => ([]),
    rgb: x => [255, 255, 255],
    emb: x => ({ rgb: [255, 255, 255] })
  }
})
'lapse' |> console.log
lapse |> decoCrostab |> says['lapse']
'' |> console.log
'result' |> console.log
result |> decoCrostab |> says['result']
