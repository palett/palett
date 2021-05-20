import { Cyan }       from '@palett/cards'
import { HEX }        from '@palett/enum-color-space'
import { INVERSE }    from '@palett/enum-font-effects'
import { logger }     from '@spare/logger'
import { DyeFactory } from '../src/dyeFactory'

DyeFactory.prep(HEX, INVERSE)(Cyan.lighten_2)('shakes') |> logger