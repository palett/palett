import { $, logger }          from '@spare/logger'
import { test }               from 'node:test'
import { rgbToHex }           from '../src/hex.js'
import { rgbToHsl }           from '../src/hsl.js'
import { hexToRgb, hslToRgb } from '../src/rgb.js'
import { NORD }               from './resources/NORD.js'

console.log(NORD)
NORD['royal blue']='#3D428B'

test('hex-hsl-rgb', () => {
  for (const [ key, hex ] of Object.entries(NORD)) {
    const rgb1 = hexToRgb(hex)
    const hsl = rgbToHsl(rgb1)
    const rgb2 = hslToRgb(hsl)
    const hex2 = rgbToHex(rgb2)
    logger($[key].p('→')['hex'](hex)['rgb1'](rgb1)['hsl'](hsl)['rgb2'](rgb2)['hex'](hex2))
  }
})
