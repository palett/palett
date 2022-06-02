import { DyeFab }       from '../../dye/src/DyeFab'
import { BOLD, ITALIC } from '@palett/enum-font-effects'
import { HEX }          from '@palett/enum-color-space'

const fab = DyeFab.prep(HEX, ITALIC, BOLD)
const f = fab.make('#F1D501')
f('some') |> console.log