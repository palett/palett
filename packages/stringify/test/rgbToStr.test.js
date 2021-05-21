import { Conv }       from '@palett/convert'
import { DyeFab }     from '@palett/dye-factory'
import { INVERSE }    from '@palett/enum-font-effects'
import { logger, xr } from '@spare/logger'
import { mapper }     from '@vect/object'
import { rgbToStr }   from '../index'
import { XTERM }      from './presets/xterm'

const candidates = mapper(XTERM, Conv.rgb.rgb)
const toStr = rgbToStr.bind(DyeFab.prep(INVERSE))

for (const [ key, rgb ] of Object.entries(candidates)) {
  xr()[key](rgb |> toStr) |> logger
}