import { Cyan }             from '@palett/cards'
import { HEX, RGB }         from '@palett/enum-color-space'
import { UNDERLINE }        from '@palett/enum-font-effects'
import { deco }             from '@spare/deco'
import { decoFunc, logger } from '@spare/logger'
import { DyeFactory }       from '../src/dye'

const dyeFactory = DyeFactory.build(HEX, [UNDERLINE])
dyeFactory |> decoFunc |> logger
const dyeInstance = dyeFactory(Cyan.accent_1)
'some' |> dyeInstance |> logger
