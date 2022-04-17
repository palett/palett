import { randBetw }                  from '@aryth/rand'
import { hexToHsl }                  from '@palett/convert'
import { Dye }                       from '@palett/dye'
import { Fluo }                      from '@palett/fluo'
import { SUBTLE }                    from '@palett/presets'
import { hslToStr }                  from '@palett/stringify'
import { DecoCrostab, logger, says } from '@spare/logger'
import { HSL }                       from '../src/types/HSL'
import { H, L }                      from '../resources/attr'
import { Gradient }                  from '../src/gradient'

// const hslTL = '#DFEF87'|> hexToHsl|> HSL.from
// const hslBR = '#D16F52'|> hexToHsl|> HSL.from

const hslTL = HSL.build(randBetw(0, 360), randBetw(15, 55), randBetw(50, 80))
const hslBR = HSL.build(randBetw(0, 360), randBetw(15, 55), randBetw(20, 50))

hslTL |> hslToStr |> logger
hslBR |> hslToStr |> logger

const decoHexToNameCrostab = DecoCrostab({
  read: ([ hex, name ]) => Fluo.hex(`'${hex}', // ${name}`, hex),
  presets: []
})

const crostab = Gradient.crostab({
  hsl: { tl: hslTL, br: hslBR },
  ind: { x: L, y: H },
  size: { x: 3, y: 4 },
})

crostab |> DecoCrostab({ read: hslToStr, presets: [] }) |> says['original']
'' |> logger

crostab.map(x => x.nearest()) |> decoHexToNameCrostab |> logger
'' |> logger

const crostab2 = Gradient.crostab({
  hsl: { tl: hslTL, br: hslBR },
  ind: { x: L, y: H },
  size: { x: 3, y: 4 },
  ext: { top: 3, bottom: 3, left: 3, right: 3 }
})

crostab2 |> DecoCrostab({ read: hslToStr, presets: [] }) |> logger
'' |> logger

crostab2.map(x => x.nearest()) |> decoHexToNameCrostab |> logger

