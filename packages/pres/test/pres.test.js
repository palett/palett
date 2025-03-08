import {
  AFRO, ARUBA, AZALE, BERING, BISTRO, BLUSH, BRANDY, DECANTE, DUSKY, ENSIGN, KELLY, LILAC, NORSE, PAGODA, PERSIAN, PINE,
  PRETTY, ROCOCCO, RODD, SANDY, SUMMER, TOBACCO, WINE
}                          from '@palett/presets'
import { rgbToStr }        from '@palett/stringify'
import { $, logger }       from '@spare/logger'
import { indexed, mapper } from '@vect/object-mapper'
import { test }            from 'node:test'
import { demo }            from '../src/preset-utils.js'

const Pavtone = {
  RODD: RODD,
  AZALE: AZALE,
  AFRO: AFRO,
  SUMMER: SUMMER,
  SANDY: SANDY,
  TOBACCO: TOBACCO,
  BRANDY: BRANDY,
  DECANTE: DECANTE,
  BISTRO: BISTRO,
  KELLY: KELLY,
  PAGODA: PAGODA,
  PINE: PINE,
  NORSE: NORSE,
  ARUBA: ARUBA,
  BERING: BERING,
  DUSKY: DUSKY,
  ENSIGN: ENSIGN,
  PERSIAN: PERSIAN,
  LILAC: LILAC,
  WINE: WINE,
  ROCOCCO: ROCOCCO,
  PRETTY: PRETTY,
  BLUSH: BLUSH
}

// const ALPHA=Pres.build()

const LEN = 7
test('preset test', () => {
  for (let [ key, pres ] of indexed(Pavtone)) {
    const { min, max, nan } = mapper(pres.toRgb(), rgbToStr)
    logger($[`>> ${key.padStart(7)}`](demo(pres, LEN))['original'](min, max, nan))
  }
})