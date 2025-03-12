import { hexToStr, hslToStr, rgbToStr } from '@palett/stringify'
import { $ }                            from '@spare/logger'
import { indexedOf }                    from '@vect/object-mapper'
import { test }                         from 'node:test'
import { rgiToHex }                     from '../src/hex.js'
import { rgaToHsi }                     from '../src/hsi.js'
import { hsiToHsl }                     from '../src/hsl.js'
import { rgiToRgb }                     from '../src/rgb.js'
import { hexToRgi, hsaToRgi }           from '../src/rgi.js'
import { PURE }                         from './resources/PURE.js'
import { ROEM }                         from './resources/ROEM.js'

test('rgi-hsi-rgi', () => {
  const o = { ...ROEM, ...PURE }
  console.log(o)
  for (const [ name, hex ] of indexedOf(o)) {
    const rgi = hexToRgi(hex)
    const r = rgi >> 16 & 0xFF, g = rgi >> 8 & 0xFF, b = rgi & 0xFF
    const hsi = rgaToHsi(r, g, b)
    const h = hsi >> 16 & 0x1FF, s = hsi >> 8 & 0xFF, l = hsi & 0xFF
    const rgi2 = hsaToRgi(h, s, l)
    const hex2 = rgiToHex(rgi2)
    console.log($['name'](name)
      ['hex1'](hexToStr(hex))
      ['rgb1'](rgbToStr(rgiToRgb(rgi)))
      ['hsl'](hslToStr(hsiToHsl(hsi)))
      ['rgb2'](rgbToStr(rgiToRgb(rgi2)))
      ['hex2'](hexToStr(hex2)))
  }
})
