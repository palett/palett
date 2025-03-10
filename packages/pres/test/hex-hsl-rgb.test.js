import { roundD1 }                                                    from '@aryth/math'
import { hexToRgb, hsiToHsl, hsiToRgi, intToRgb, rgaToHsi, rgbToHex } from '@palett/convert'
import { $, logger }                                                  from '@spare/logger'
import { test }                                                       from 'node:test'

export const PRIMARY = {
  background: '#2E3440',
  foreground: '#D8DEE9'
}

export const CURSOR = {
  text: '#2E3440',
  cursor: '#D8DEE9'
}

export const NORMAL = {
  black: '#3B4252',
  red: '#BF616A',
  green: '#A3BE8C',
  yellow: '#EBCB8B',
  blue: '#81A1C1',
  magenta: '#B48EAD',
  cyan: '#88C0D0',
  white: '#E5E9F0'
}

export const EXTREME = {
  'pure-black': '#000000',
  'pure-white': '#FFFFFF',
  'pure-red': '#FF0000',
  'pure-yellow': '#FFFF00',
  'pure-green': '#00FF00',
  'pure-cyan': '#00FFFF',
  'pure-blue': '#0000FF',
  'pure-magenta': '#FF00FF'
}

const o = Object.assign({}, PRIMARY, CURSOR, NORMAL, EXTREME)

test('hex-hsl-rgb', () => {
  for (const [ key, hex ] of Object.entries(o)) {
    const rgb1 = hexToRgb(hex)
    const hsi = rgaToHsi(...rgb1)
    const hsl = hsiToHsl(hsi).map(roundD1)
    const rgb2 = intToRgb(hsiToRgi(hsi))
    const hex2 = rgbToHex(rgb2).toUpperCase()
    logger($[key].p('→')['hex'](hex)['rgb1'](rgb1)['hsl'](hsl)['rgb2'](rgb2)['hex'](hex2))
  }
})
