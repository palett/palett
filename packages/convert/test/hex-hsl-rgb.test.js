import { hexToStr, hslToStr, rgbToStr } from '@palett/stringify'
import { $, logger }                    from '@spare/logger'
import { test }                         from 'node:test'
import { rgbToHex }                     from '../src/hex.js'
import { rgbToHsl }                     from '../src/hsl.js'
import { hexToRgb, hslToRgb }           from '../src/rgb.js'
import { PURE }                         from './resources/PURE.js'
import { ROEM }                         from './resources/ROEM.js'


test('hex-hsl-rgb', () => {
  for (const [ name, hex1 ] of Object.entries({ ...ROEM, ...PURE })) {
    const rgb1 = hexToRgb(hex1)
    const hsl = rgbToHsl(rgb1)
    const rgb2 = hslToRgb(hsl)
    const hex2 = rgbToHex(rgb2)
    logger($['name'].p(name)
      ['hex1'](hexToStr(hex1))
      ['rgb1'](rgbToStr(rgb1))
      ['hsl'](hslToStr(hsl))
      ['rgb2'](rgbToStr(rgb2))
      ['hex2'](hexToStr(hex2)))
  }
})
