import { makeEmbedded }                                                               from '@foba/util'
import { AFRO, BESQUE, BRANDY, FRESH, KELLY, PERSIAN, PINE, PLANET, ROCOCCO, SUBTLE } from '@palett/presets'
import { NUM, STR }                               from '@typen/enum-data-types'
import { hexToHsl, hexToRgi, hslToRgb, rgbToHsl } from '../../index.js'
import { hexToStr, intToStr, rgbToStr }           from '@palett/stringify'
import { strategies }                                                                 from '@valjoux/strategies'
import { Beta }                                                                       from './beta.js'
import { Gamma }                                                                      from './gamma.js'
import { UCA }                                                                        from './pres.js'

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: {
    alpha: { pos: BESQUE, neg: PLANET, str: PERSIAN },
    beta: { pos: KELLY, neg: ROCOCCO, str: BRANDY },
    gamma: { pos: AFRO, neg: PINE, str: SUBTLE },
  } |> makeEmbedded,
  methods: {
    ben: ({ max, min, na }) => {
      return { max, min, nan: na }
    },
    dev: ({ max, min, na }) => {
      const ia = hexToRgi(max)
      const ib = hexToRgi(min)
      const ic = hexToRgi(na)
      const [ ha, sa, la ] = Beta.rgbToHsl(ia >> 16 & 0xFF, ia >> 8 & 0xFF, ia & 0xFF)
      const [ hb, sb, lb ] = Beta.rgbToHsl(ib >> 16 & 0xFF, ib >> 8 & 0xFF, ib & 0xFF)
      const [ hc, sc, lc ] = Beta.rgbToHsl(ic >> 16 & 0xFF, ic >> 8 & 0xFF, ic & 0xFF)
      return {
        max: Beta.hslToRgb(ha, sa, la),
        min: Beta.hslToRgb(hb, sb, lb),
        nan: Beta.hslToRgb(hc, sc, lc),
      }
    },
    rea: ({ max, min, na }) => {
      const a = hexToHsl(max)
      const b = hexToHsl(min)
      const c = hexToHsl(na)
      return {
        max: hslToRgb(a),
        min: hslToRgb(b),
        nan: hslToRgb(c),
      }
    },
    uca: (pres) => {
      const uca = UCA.presToUCA(pres)
      return UCA.ucaToPres(uca)
    }
  },
  showPretty: false,
})
lapse |> console.log
export const presToStr = ({ max, min, nan }) => {
  max = typeof max === STR ? hexToStr(max) : typeof max === NUM ? intToStr(max) : rgbToStr(max)
  min = typeof min === STR ? hexToStr(min) : typeof min === NUM ? intToStr(min) : rgbToStr(min)
  nan = typeof nan === STR ? hexToStr(nan) : typeof nan === NUM ? intToStr(nan) : rgbToStr(nan)
  return `${min}-${max}`
}
for (let key of result.side) {
  const ben = result.cell(key, 'ben')|> presToStr
  const dev = result.cell(key, 'dev')|> presToStr
  const rea = result.cell(key, 'rea')|> presToStr
  const uca = result.cell(key, 'uca')|> presToStr;
  `{key} [ben] ${ben} [dev] ${dev} [rea] ${rea} [uca] ${uca}` |> console.log //
}