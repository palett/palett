import { Cyan }             from '@palett/cards'
import { HEX }              from '@palett/enum-color-space'
import { ITALIC }           from '@palett/enum-font-effects'
import { decoFunc, logger } from '@spare/logger'
import { DyeFactory }       from '../src/DyeFactory'

const dyeFactory = DyeFactory.prep(HEX, ITALIC)
dyeFactory |> decoFunc |> logger
const dyeInstance = dyeFactory(Cyan.accent_1)
'some' |> dyeInstance |> logger
