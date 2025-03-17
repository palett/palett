import { hexToHsi, hexToHsl, hsiToHsl } from '@palett/convert'
import { dhex }                         from '@palett/dye'
import { MIDTONE }                      from '@palett/nuance-midtone'
import { hexToStr, hslToStr }           from '@palett/stringify'
import { test }                         from 'node:test'
import { Munsell }                      from '../src/Munsell.js'

test('munsell range', () => {
  const munsell = Munsell.build(MIDTONE)
  const candidates = {
    '#CA3422': 'Poinciana',
    '#B5817D': 'Ash Rose',
    '#3AB0A2': 'Waterfall',
    '#AAAAC4': 'Cosmic Sky',
    '#ECB2B3': 'Powder Pink',
    '#D75C5D': 'Spiced Coral',
  }
  for (let hex in candidates) {
    const hsi = hexToHsi(hex)
    const h = (hsi >> 16 & 0x1FF)
    console.log(hexToStr(hex), hslToStr(hexToHsl(hex)), dhex.call(hex, candidates[hex]))
    const [ lo, hi ] = munsell.range(h, 1)
    const hsiLo = munsell.list[lo]
    const hsiHi = munsell.list[hi]
    console.log(findBin(h), munsell.range(h), hslToStr(hsiToHsl(hsiLo)), hslToStr(hsiToHsl(hsiHi)))
  }
})

const findBin = (hue, span = 1) => {
  for (let i = 0, min = 0, mid = 6, max = 12; i < 30; i++, min = max, mid += 12, max += 12) {
    const lo = i - 1, hi = i
    if (min <= hue && hue < mid) return { [min - span * 12]: lo - span, [min + span * 12]: lo + span }
    if (hue === mid) return { [min - span * 12]: lo - span, [max + span * 12]: (hi + span) % 30 }
    if (mid < hue && hue <= max) return { [max - span * 12]: hi - span, [max + span * 12]: (hi + span) % 30 }
  }
}

