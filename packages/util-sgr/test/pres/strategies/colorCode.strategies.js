import { makeEmbedded }                         from '@foba/util'
import { Amber, DeepOrange, Green, Grey, Teal } from '@palett/cards'
import { hexToInt }                             from '@palett/convert'
import { decoCrostab, says }                    from '@spare/logger'
import { strategies }                           from '@valjoux/strategies'
import { convColor }                            from '../lib/convColor'
import { Morisot }                              from '../lib/morisot'
import { parseStyle }                           from '../lib/toStyle'

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    alpha: { fore: Teal.accent_1, back: Amber.darken_1 },
    simple: { fore: Grey.lighten_4, back: Grey.darken_4, style: { bold: true } },
    gauguin: { fore: DeepOrange.accent_1, back: Green.base, style: { bold: true, underline: true } },
  } |> makeEmbedded,
  methods: {
    bench: (...args) => args.slice(0, 2),
    cla: Morisot.presetToCode,
    dev({ fore, back, style }) {
      fore = hexToInt(fore).toString(16).padStart(6, '0')
      back = hexToInt(back).toString(16).padStart(6, '0')
      style = parseStyle(style).toString(16)
      return style + fore + back
    },
    arc({ fore, back, style }) { return [ parseStyle(style), convColor(fore), convColor(back) ] },
    edg({ fore, back, style }) {
      fore = convColor(fore)
      back = convColor(back)
      style = parseStyle(style)
      return { fore, back, style }
    },
    // fut({ fore, back, style }) {
    //   fore = hexToInt(fore)
    //   back = hexToInt(back)
    //   style = parseStyle(style)
    //   return [ fore << 24 & back, style ]
    // },
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']

