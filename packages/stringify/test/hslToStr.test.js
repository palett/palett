import { Conv }       from '@palett/convert'
import { DyeFab }     from '@palett/dye-factory'
import { INVERSE }    from '@palett/enum-font-effects'
import { logger, xr } from '@spare/logger'
import { mapper }     from '@vect/object'
import { hslToStr }   from '../index'
import { XTERM }      from './presets/xterm'

const candidates = mapper(XTERM, Conv.rgb.hsl)
const toStr = hslToStr.bind(DyeFab.prep(INVERSE))

for (const [ key, hsl ] of Object.entries(candidates)) {
  xr()[key](hsl |> toStr) |> logger
}