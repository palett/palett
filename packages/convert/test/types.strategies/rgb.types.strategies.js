import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { RGB }               from './RGB'

const { lapse, result } = strategies({
  repeat: 1E+7,
  candidates: {
    tinsel: [ 195, 150, 77 ],
    citron: [ 223, 222, 155 ],
    cement: [ 192, 185, 164 ],
    maroon: [ 131, 70, 85 ],
  },
  methods: {
    dev: (r, g, b) => [ r, g, b ],
    rea: (r, g, b) => new RGB(r, g, b),
    arc: (r, g, b) => (((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)),
  },
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']