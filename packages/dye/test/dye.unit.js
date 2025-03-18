import { BlueGrey, Brown, LightGreen, Purple } from '@palett/cards'
import { hexToHsl, hexToInt, hexToRgb } from '@palett/convert'
import { Dye }                          from '../src/index.js'


const hex = BlueGrey.accent_2
const rgb = hexToRgb(Purple.lighten_3)
const int = hexToInt(LightGreen.accent_3)
const hsl = hexToHsl(Brown.base)

console.log(Dye.hex(hex)('BlueGrey.accent_2'))
console.log(Dye.rgb(rgb)('Purple.lighten_3'))
console.log(Dye.int(int)('LightGreen.accent_3'))
console.log(Dye.hsl(hsl)('Brown.base'))