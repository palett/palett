import { BlueGrey, Brown, LightGreen, Purple } from '@palett/cards'
import { hexToHsl, hexToInt, hexToRgb }        from '@palett/convert'
import { DyeFactory }                          from '@palett/dye-factory'
import { RGB }                                 from '@palett/enum-color-space'
import { UNDERLINE }                           from '@palett/enum-font-effects'
import { Dye }                                 from '../src/dye'

// export const dye = Dye.bind({ head: '', tail: '' })
'some' |> DyeFactory.prep(RGB, UNDERLINE)([ 127, 127, 127 ]) |> console.log
'some' |> Dye([ 127, 127, 127 ]) |> console.log

'BlueGrey.accent_2' |> Dye.hex(BlueGrey.accent_2) |> console.log
'Purple.lighten_3' |> Dye.rgb(Purple.lighten_3 |> hexToRgb) |> console.log
'LightGreen.accent_3' |> Dye.int(LightGreen.accent_3 |> hexToInt) |> console.log
'Brown.base' |> Dye.hsl(Brown.base |> hexToHsl) |> console.log
