import { Cyan }              from '@palett/cards'
import { HEX }               from '@palett/enum-color-space'
import { ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { decoFunc, logger }  from '@spare/logger'
import { DyeFactory }        from '../src/dye'

const dyeFactory = DyeFactory.build(HEX, [ITALIC])
dyeFactory |> decoFunc |> logger
const dyeInstance = dyeFactory(Cyan.accent_1)
'some' |> dyeInstance |> logger
