import { randBetw }                             from '@aryth/rand'
import { intToRgb }                             from '@palett/convert'
import { rgbToStr }                             from '@palett/stringify'
import { hexToHsi, hsiToRgi, modHsi, rgaToHsi } from './color-bitwise.js'
import { Pres }                                 from './Pres.js'
import { sequence }                             from './sequence.js'

export function demo(pres, count) {
  return `${sequence.call(pres, count).map(int => rgbToStr(intToRgb(int))).join(' ')} | ${(rgbToStr(intToRgb(pres.nan)))}`
}

const hsiUpward = (hsi) => {
  const dh = randBetw(-16, 16)
  const ds = randBetw(-8, 8)
  const dl = randBetw(-8, 24)
  return modHsi(hsi, dh, ds, dl)
}

const hsiReverse = (hsi) => {
  const dh = randBetw(150, 210)
  const ds = randBetw(-32, -24)
  const dl = randBetw(+16, +32)
  return modHsi(hsi, dh, ds, dl)
}

const rgiReverse = (rgi) => {
  const r = rgi >> 16 & 0xFF, g = rgi >> 8 & 0xFF, b = rgi >> 0 & 0xFF
  const hsi0 = rgaToHsi(r, g, b)
  const dh = randBetw(150, 210)
  const ds = randBetw(-32, -24)
  const dl = randBetw(+16, +32)
  const hsi1 = modHsi(hsi0, dh, ds, dl)
  return hsiToRgi(hsi1)
}
/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {Pres}
 */
export const randPres = (hex, name) => {
  const min = hexToHsi(hex)
  const max = hsiUpward(min)
  const nan = hsiToRgi(hsiReverse(min))
  const pres = new Pres(min, max, nan)
  if (name?.length) pres.name = name
  return pres
}