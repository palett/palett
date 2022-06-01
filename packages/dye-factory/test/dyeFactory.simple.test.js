import { Cyan }             from '@palett/cards'
import { HEX }              from '@palett/enum-color-space'
import { ITALIC }           from '@palett/enum-font-effects'
import { decoFunc, logger } from '@spare/logger'
import { DyeFab }           from '../src/DyeFab'

const fab = DyeFab.prep(HEX, ITALIC)
fab |> decoFunc |> logger
const fn = fab.make(Cyan.accent_1)
'some' |> fn |> logger
