import { BlueGrey, Brown, LightGreen, Purple } from '@palett/cards'
import { hexToHsl, hexToInt, hexToRgb }        from '@palett/convert'
import { Dye }                                 from '../index.js'


const hex = BlueGrey.accent_2
const rgb = Purple.lighten_3 |> hexToRgb
const int = LightGreen.accent_3 |> hexToInt
const hsl = Brown.base |> hexToHsl

'BlueGrey.accent_2' |> Dye.hex(hex) |> console.log
'Purple.lighten_3' |> Dye.rgb(rgb) |> console.log
'LightGreen.accent_3' |> Dye.int(int) |> console.log
'Brown.base' |> Dye.hsl(hsl) |> console.log