import { hexToStr, rgbToStr } from '@palett/stringify'
import { logger, xr }         from '@spare/logger'
import { hexToRgb }           from '../src/hexToRgb.js'
import { rgbToHex }           from '../src/rgbToHex.js'
import { NORD }               from './resources/NORD.js'

for (const [ key, hex ] of Object.entries(NORD)) {
  const rgb = hexToRgb(hex)
  xr()
    [key](hex|> hexToStr)
    .rgb(rgb|> rgbToStr)
    .hex(rgb|> rgbToHex|> hexToStr)
    |> logger
}