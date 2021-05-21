import { Cyan }               from '@palett/cards'
import { hexToHsl, hexToRgb } from '@palett/convert'
import { HEX }                from '@palett/enum-color-space'
import { BOLD, DIM, INVERSE } from '@palett/enum-font-effects'
import { DyeFactory }         from '../src/DyeFactory'


DyeFactory.prep(HEX, INVERSE)(Cyan.lighten_2)('shakes') |> console.log
DyeFactory.hex(DIM)(Cyan.lighten_4,)('william') |> console.log
DyeFactory.hsl()(Cyan.darken_3 |> hexToHsl)('william') |> console.log
DyeFactory.rgb(BOLD)(Cyan.accent_1 |> hexToRgb)('william') |> console.log