import { hexToRgi, hsiToHsl, rgaToHsi, rgiToHex, rgiToHsl, rgiToRgb } from '@palett/convert'
import { hexToStr, hslToStr, rgbToStr }                               from '@palett/stringify'
import { $ }                                                          from '@spare/logger'
import { indexedOf }                                                  from '@vect/object-mapper'
import { test }                                                       from 'node:test'
import { dslRga }                                                     from '../src/dslRgi.js'
import { PURE }                                                       from './resources/PURE.js'
import { ROEM }                                                       from './resources/ROEM.js'

test('dslRga', () => {
  const o = { ...ROEM, ...PURE }
  console.log(o)
  for (const [ name, hex ] of indexedOf(o)) {
    const rgi = hexToRgi(hex)
    const r = rgi >> 16 & 0xFF, g = rgi >> 8 & 0xFF, b = rgi & 0xFF
    const hsi = rgaToHsi(r, g, b)
    const h = hsi >> 16 & 0x1FF, s = hsi >> 8 & 0xFF, l = hsi & 0xFF
    const rgi2 = dslRga(r, g, b, 0, 25)
    const hex2 = rgiToHex(rgi2)
    console.log($['name'](name)
      ['hex1'](hexToStr(hex))
      ['rgb1'](rgbToStr(rgiToRgb(rgi)))
      ['hsl1'](hslToStr(hsiToHsl(hsi)))
      ['hsl2'](hslToStr(rgiToHsl(rgi2)))
      ['rgb2'](rgbToStr(rgiToRgb(rgi2)))
      ['hex2'](hexToStr(hex2)))
  }
})
