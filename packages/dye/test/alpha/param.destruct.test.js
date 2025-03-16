import { Chrono } from 'elprimero'

const { lapse, result } = Chrono.strategies({
  repeat: 1E+7,
  paramsList: {
    rgb: [ { rgb: [ 128, 128, 128 ] } ],
    hsl: [ { hsl: [ 128, 55, 55 ] } ],
  },
  funcList: {
    bench: x => x,
    ob: config => {
      let color
      if ((color = config.rgb)) return color
      if ((color = config.hex)) return color
      if ((color = config.hsl)) return color
    },
    destruct: ({ rgb, hex, hsl }) => {
      if (rgb) return rgb
      if (hex) return hex
      if (hsl) return hsl
    },
    switcher: ({ rgb, hex, hsl }) => {
      switch (true) {
        case !!rgb:
          return rgb
        case !!hex:
          return hex
        case !!hsl:
          return hsl
        default:
          return rgb
      }
    },
  },
})
'lapse' |> console.log
lapse |> decoCrostab |> says['lapse']
'' |> console.log
'result' |> console.log
result |> decoCrostab |> says['result']
