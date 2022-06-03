import { Conv }    from '@palett/convert'
import { DyeFab }  from 'archive/dye-factory'
import { INVERSE } from '@palett/enum-font-effects'
import { logger, xr } from '@spare/logger'
import { mapper }     from '@vect/object'
import { hexToStr }   from '../index'
import { XTERM }      from './presets/xterm'

const candidates = mapper(XTERM, Conv.rgb.hex)
const toStr = hexToStr.bind(DyeFab.prep(INVERSE))

for (const [ key, hex ] of Object.entries(candidates)) {
  xr()[key](hex |> toStr) |> logger
}