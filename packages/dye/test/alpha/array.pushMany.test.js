import { Chrono } from 'elprimero'
import { CrosTabX } from 'xbrief'

const union = Array.prototype.push
const { lapse, result } = Chrono.strategies({
  repeat: 2E+6,
  paramsList: {
    simple: [['foo', 'bar']],
    slightly: [['A', 'B', 'C', 'D']],
    longer: [Array.from({ length: 128 }, (_, i) => i)],
    empty: [[]]
  },
  funcList: {
    bench: x => ['kha'],
    push: ar => {
      const ve = ['kha']
      ve.push(...ar)
      return ve
    },
    pushDev: ar => {
      const ve = ['kha']
      ve.push.apply(ve, ar)
      return ve
    },
    concat: ar => ['kha'].concat(ar),
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log
