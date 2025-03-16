import { Blue, Lime, Orange }    from '@palett/cards'
import { BOLD, ITALIC }          from '@palett/enum-font-effects'
import { decoCrostab, says }     from '@spare/logger'
import { strategies }            from '@valjoux/strategies'
import { HexDye }                from '../../index.js'
import { HexDye as HexDyeAlpha } from './alpha.js'
// enzo: [ 'enzo' ],
// urus: [ 'urus' ],
// zagato: [ 'zagato' ]

const hexDyeAlpha = HexDyeAlpha.prep(BOLD, ITALIC)
const hexDyeBeta = new HexDye(0b11)

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    enzo: [ Lime.accent_3, 'enzo' ],
    urus: [ Orange.accent_3, 'urus' ],
    zaga: [ Blue.accent_3, 'zagato' ],
  },
  methods: {
    bench: x => x,
    alpha: (c, tx) => hexDyeAlpha.render(c, tx),
    beta: (c, tx) => hexDyeBeta.render(c, tx),
  },
})
lapse |> decoCrostab |> says['lapse']
// result |> decoCrostab |> says['result']

result |> console.log