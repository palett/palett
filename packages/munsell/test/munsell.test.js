import { hsiToHsl, hslToHex } from '@palett/convert'
import { hexToStr, hslToStr } from '@palett/stringify'
import { init }               from '@vect/vector-init'
import { test }               from 'node:test'
import { Munsell }            from '../src/Munsell.js'

test('Munsell nearest function test', () => {
  const hsls = init(30, i => [ i * 12, 42, 60 ])
  for (let hsl of hsls) {
    const [ h, s, l ] = hsl
    const curr = (h & 0x1FF) << 16 | ((s * 2) & 0xFF) << 8 | (l * 2) & 0xFF
    const near = Munsell.nearest(curr)
    const entry = Munsell.nearestEntry(curr)
    if (!entry) {
      console.log(hexToStr(hslToHex(hsl)), hslToStr(hsl), null)
      continue
    }
    const [ hex, name ] = entry
    console.log(hslToStr(hsl), '→', hslToStr(hsiToHsl(near)), hexToStr(hex), name)
  }
})