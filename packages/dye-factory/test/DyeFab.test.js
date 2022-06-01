import { DyeFab }       from '../src/DyeFab'
import { BOLD, ITALIC } from '@palett/enum-font-effects'

const fab = DyeFab.hex(ITALIC, BOLD)
const f = fab.make('#F1D501')
f('some') |> console.log