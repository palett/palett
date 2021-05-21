import { Cyan }       from '@palett/cards'
import { HEX }        from '@palett/enum-color-space'
import { INVERSE }    from '@palett/enum-font-effects'
import { DyeFactory } from '../src/DyeFactory'


DyeFactory.prep(HEX, INVERSE)(Cyan.lighten_2)('shakes') |> console.log