import { hsaToHsi, rgaToRgi } from '@palett/convert'
import { hslToStr }           from '@palett/stringify'
import { $, logger }          from '@spare/logger'
import { indexed, mapper }    from '@vect/object-mapper'
import { test }               from 'node:test'
import { Pres }               from '../src/Pres.js'
import { demoTapeHSL }        from '../src/sequence.js'

// const ALPHA=Pres.build()
const BOOK = {
  'REDx 000 A': Pres.build(hsaToHsi(5, 45, 54), hsaToHsi(347, 45, 61), rgaToRgi(121, 127, 134)),
  'REDx 000 B': Pres.build(hsaToHsi(0, 54, 63), hsaToHsi(348, 53, 51), rgaToRgi(121, 127, 134)),
}
const LEN = 7
test('preset test', () => {
  for (let [ key, pres ] of indexed(BOOK)) {
    const { min, max, nan } = mapper(pres.toHsl(), hslToStr)
    logger($[`>> ${key.padStart(7)}`](demoTapeHSL.call(pres, LEN))['original'](min, max, nan))
  }
})

