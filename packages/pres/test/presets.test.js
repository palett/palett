import {
  AFRO, ARUBA, AZALE, BERING, BISTRO, BLUSH, BRANDY, DECANTE, DUSKY, ENSIGN, KELLY, LILAC, NORSE, PAGODA, PERSIAN, PINE,
  PRETTY, ROCOCCO, RODD, SANDY, SUMMER, TOBACCO, WINE
}                  from '@palett/presets'
import { logger }  from '@spare/logger'
import { indexed } from '@vect/object-mapper'
import { test } from 'node:test'
import { demo } from '../src/pres-extensions.js'

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
const LEN = 7
test('preset test', () => {
  for (let [ key, preset ] of indexed(Pavtone)) {
    logger(`>> ${key.padStart(7)} ${demo(preset, LEN)}`)
    logger('')
  }
})