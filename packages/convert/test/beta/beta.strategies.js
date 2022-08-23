import { makeEmbedded }       from '@foba/util'
import { hslToRgb, rgbToHsl } from '../../index.js'
import { intToStr, rgbToStr } from '@palett/stringify'
import { strategies }         from '@valjoux/strategies'
import { Beta }               from './beta.js'
import { Gamma }              from './gamma.js'


const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: {
    tinsel: [ 195, 150, 77 ],
    citron: [ 223, 222, 155 ],
    cement: [ 192, 185, 164 ],
    maroon: [ 131, 70, 85 ],
  } |> makeEmbedded,
  methods: {
    dev: ([ r, g, b ]) => {
      const [ h, s, l ] = Beta.rgbToHsl(r, g, b)
      return Beta.hslToRgb(h, s, l)
    },
    rea: (rgb) => {
      const hsl = rgbToHsl(rgb)
      return hslToRgb(hsl)
    },
    gam: ([ r, g, b ]) => {
      const [ h, s, l ] = Gamma.rgbToHsl(r, g, b)
      // const h = (hsl >> 16) & 0xFF, s = (hsl >> 8) & 0xFF, l = (hsl >> 0) & 0xFF
      return Gamma.hslToRgb(h, s, l)
    }
  },
  showPretty: false,
})
lapse |> console.log
for (let key of result.side) {
  const dev = result.cell(key, 'dev')|> rgbToStr
  const rea = result.cell(key, 'rea')|> rgbToStr
  const gam = result.cell(key, 'gam')|> intToStr;
  `{key} [dev] (${dev}) [rea] (${rea}) [gam] (${gam})` |> console.log
}