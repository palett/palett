import { randBetw }         from '@aryth/rand'
import { intToRgb }         from '@palett/convert'
import { rgbToStr }         from '@palett/stringify'
import { hexToHsi, modHsi } from './color-bitwise.js'
import { Pres }             from './Pres.js'
import { sequence }         from './sequence.js'

export function demo(pres, count) {
  return `${sequence.call(pres, count).map(int => rgbToStr(intToRgb(int))).join(' ')} | ${(rgbToStr(intToRgb(pres.nan)))}`
}

const randUpward = (hsi) => {
  const dh = randBetw(-16, 16)
  const ds = randBetw(-8, 8)
  const dl = randBetw(-8, 24)
  return modHsi(hsi, dh, ds, dl)
}

const randCounter = (hsi) => {
  const dh = randBetw(150, 210)
  const ds = randBetw(-32, -24)
  const dl = randBetw(+16, +32)
  return modHsi(hsi, dh, ds, dl)
}
/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {Pres}
 */
export const randPres = (hex, name) => {
  const min = hexToHsi(hex)
  const max = randUpward(min)
  const nan = randCounter(min)
  const pres = new Pres(min, max, nan)
  if (name?.length) pres.name = name
  return pres
}