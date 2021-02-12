import { Cyan, Lime }        from '@palett/cards'
import { hexToRgb }          from '@palett/convert'
import { BOLD, ITALIC }      from '@palett/enum-font-effects'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { Dye }               from '../src/dye'
import { HexDye }            from '../src/dye/HexDye'
import { PrepDye }           from '../src/PrepDye/PrepDye'
import { PrepHexDye }        from '../src/PrepDye/PrepHexDye'

const prepDye = PrepDye(BOLD, ITALIC)
const prepHexDye = PrepHexDye(BOLD, ITALIC)
{
  const { lapse, result } = strategies({
    repeat: 1E+6,
    candidates: {
      simple: [Lime.accent_3, BOLD, ITALIC],
      misc: [Cyan.accent_3, BOLD, ITALIC],
    },
    methods: {
      bench: x => x,
      dye: (hex, ...effects) => Dye(hex |> hexToRgb, ...effects),
      hexDye: HexDye,
      prepDye: hex => hex |> hexToRgb |> prepDye,
      prepHexDye: hex => hex  |> prepHexDye,
    }
  })
  lapse |> decoCrostab |> says['lapse']
  result |> decoCrostab |> says['result']
}

{
  const { lapse, result } = strategies({
    repeat: 1E+6,
    candidates: {
      enzo: ['enzo'],
      urus: ['urus'],
      zagato: ['zagato']
    },
    methods: {
      bench: x => x,
      dye: result.cell('simple', 'dye'),
      hexDye: result.cell('simple', 'hexDye'),
      prepDye: result.cell('simple', 'prepDye'),
      prepHexDye: result.cell('simple', 'prepHexDye'),
    }
  })
  lapse |> decoCrostab |> says['lapse']
  result |> decoCrostab |> says['result']
}
