import { Cyan }       from '@palett/cards'
import { HEX }        from '@palett/enum-color-space'
import { ITALIC }     from '@palett/enum-font-effects'
import { DyeFactory } from '../../dye/src/DyeFactory'

const dyeFactory = DyeFactory.prep(HEX, ITALIC)
// dyeFactory |> decoFunc |> logger
const dye = dyeFactory(Cyan.accent_1)
'some' |> dye |> console.log
