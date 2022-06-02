import { randBetw }            from '@aryth/rand'
import { hslToHex, rgbToHsl }  from '@palett/convert'
import { Fluo }                from '@palett/fluo'
import { Preset }              from '@palett/presets'
import { hslToStr }            from '@palett/stringify'
import { DecoCrostab, logger } from '@spare/logger'
import { says }                from '@spare/xr'
import { H, L, S }             from '../resources/attr'
import { Gradient }            from '../src/gradient'

const a = Preset.build('#E46C9A', '#6ED1B4') // Azalea Opal
const b = Preset.build('#B284BE', '#C6E67A') // African Violet - Sharp Green
const c = Preset.build('#CB8986', '#79D381')  // Rosette - SUMMER Green
const MIN = rgbToHsl([randBetw(160, 255), randBetw(0, 196), randBetw(0, 196)])|> hslToHex
const MAX = rgbToHsl([randBetw(0, 196), randBetw(160, 255), randBetw(0, 196)])|> hslToHex
const conf = {
  preset: a, //Preset.build(MIN, MAX),
  axis: { x: L, y: H },
  size: { x: 4, y: 5 },
  extend: { top: 4, bottom: 2, left: 2, right: 2 }
}


const crostabOriginal = Gradient.crostab({ preset: conf.preset, axis: conf.axis, size: conf.size })
const crostabExtended = Gradient.crostab(conf)

conf.preset.demo(7) |> says['preset']
'' |> logger
crostabOriginal |> DecoCrostab({ read: hslToStr, presets: [] }) |> says['original']
'' |> logger
crostabExtended |> DecoCrostab({ read: hslToStr, presets: [] }) |> says['extended']

const decoLocale = DecoCrostab({ read: ([hex, name]) => Fluo.hex(`'${hex}', // ${name}`, hex), presets: [] })
'' |> logger
crostabOriginal.map(x => x.nearest()) |> decoLocale |> says['original'].br('nearest')
'' |> logger
crostabExtended.map(x => x.nearest()) |> decoLocale |> says['extended'].br('nearest')
'' |> logger

