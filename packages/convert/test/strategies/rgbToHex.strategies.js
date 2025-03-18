import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { hexToRgb }          from '../../src/hexToRgb.js'
import { dil2, dil6 }        from '../../utils/hex.js'

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    '   noir': '#000000'|> hexToRgb,
    '  rouge': '#cd0000'|> hexToRgb,
    '   vert': '#00cd00'|> hexToRgb,
    '  jaune': '#cdcd00'|> hexToRgb,
    '   bleu': '#0000ee'|> hexToRgb,
    '  magen': '#cd00cd'|> hexToRgb,
    '   cyan': '#00cdcd'|> hexToRgb,
    '  blanc': '#e5e5e5'|> hexToRgb,
    '   gris': '#7f7f7f'|> hexToRgb,
    ' b-noir': '#ff0000'|> hexToRgb,
    'b-rouge': '#00ff00'|> hexToRgb,
    ' b-vert': '#ffff00'|> hexToRgb,
    'b-jaune': '#5c5cff'|> hexToRgb,
    ' b-bleu': '#ff00ff'|> hexToRgb,
    'b-magen': '#00ffff'|> hexToRgb,
    ' b-cyan': '#ffffff'|> hexToRgb,
  },
  methods: {
    bench: v => v,
    blessed(r, g, b) {
      if (Array.isArray(r)) [ r, g, b ] = r
      return '#' + dil2(r.toString(16)) + dil2(g.toString(16)) + dil2(b.toString(16))
    },
    dev(r, g, b) {
      return '#' + (((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF)).toString(16).toUpperCase().padStart(6, '0')
    },
    edg(r, g, b) {
      const hex = (((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF)).toString(16)
      return '#' + dil6(hex)
    },
  },
  // cla, dev, edg, rea, arc, epi
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
