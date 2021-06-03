import { hexToStr, rgbToStr } from '@palett/stringify'
import { logger, xr }         from '@spare/logger'
import { rgbToHex }           from '../src/rgbToHex'
import { hexToRgb }           from '../src/hexToRgb'
import { NORD }               from './resources/NORD'

for (const [ key, hex ] of Object.entries(NORD)) {
  const rgb = hexToRgb(hex)
  xr()
    [key](hex|> hexToStr)
    .rgb(rgb|> rgbToStr)
    .hex(rgb|> rgbToHex|> hexToStr)
    |> logger
}