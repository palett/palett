import { Conv }      from '@palett/convert'
import { DyeFab }    from 'archive/dye-factory'
import { UNDERLINE } from '@palett/enum-font-effects'
import { logger, xr } from '@spare/logger'
import { mapper }     from '@vect/object'
import { intToStr }   from '../index'
import { XTERM }      from './presets/xterm'

const candidates = mapper(XTERM, Conv.rgb.int)
const toStr = intToStr.bind(DyeFab.prep(UNDERLINE))

for (const [ key, int ] of Object.entries(candidates)) {
  xr()[key](int |> toStr) |> logger
}