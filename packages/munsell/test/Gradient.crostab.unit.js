import { betw }            from '@aryth/rand'
import { hslToHex, rgbToHsl }  from '@palett/convert'
import { Fluo }                from '@palett/fluo'
import { demo, Preset }        from '@palett/presets'
import { hslToStr }            from '@palett/stringify'
import { DecoCrostab, logger } from '@spare/logger'
import { says }                from '@spare/xr'
import { Gradient }            from '../archive/Gradient.js'
import { H, L }                from '../resources/attr.js'

const a = Preset.build('#E46C9A', '#6ED1B4') // Azalea Opal
const b = Preset.build('#B284BE', '#C6E67A') // African Violet - Sharp Green
const c = Preset.build('#CB8986', '#79D381')  // Rosette - SUMMER Green
const MIN = hslToHex(rgbToHsl([ betw(160, 255), betw(0, 196), betw(0, 196) ]))
const MAX = hslToHex(rgbToHsl([ betw(0, 196), betw(160, 255), betw(0, 196) ]))
const conf = {
  preset: a, //Preset.build(MIN, MAX),
  axis: { x: L, y: H },
  size: { x: 4, y: 5 },
  extend: { top: 4, bottom: 2, left: 2, right: 2 },
}

const crostabOriginal = Gradient.crostab({ preset: conf.preset, axis: conf.axis, size: conf.size })
const crostabExtended = Gradient.crostab(conf)

says['preset'](demo(conf.preset, 7))
logger('')
says['original'](DecoCrostab({ read: hslToStr, presets: [] })(crostabOriginal))
logger('')
says['extended'](DecoCrostab({ read: hslToStr, presets: [] })(crostabExtended))

const decoLocale = DecoCrostab({ read: ([ hex, name ]) => Fluo.hex(`'${hex}', // ${name}`, hex), presets: [] })
logger('')
says['original'].br('nearest')(decoLocale(crostabOriginal.map(x => x.nearest())))
logger('')
says['extended'].br('nearest')(decoLocale(crostabExtended.map(x => x.nearest())))
logger('')

