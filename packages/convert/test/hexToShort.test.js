import { hexToStr }   from '@palett/stringify'
import { logger }     from '@spare/logger'
import { xr }         from '@spare/xr'
import { HTML_BASIC } from './resources/HTML_BASIC'
import { hexToShort } from '../dist/index'

for (const [ key, hex ] of Object.entries(HTML_BASIC)) {
  const short = hex|> hexToShort
  const r = short >> 8 & 0xf, g = short >> 4 & 0xf, b = short & 0xf
  xr().key(key).hex(hex|>hexToStr).short(short).rgbBit4([ r, g, b ]) |> logger
}