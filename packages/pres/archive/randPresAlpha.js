import { betw }                             from '@aryth/rand'
import { hexToHsi, hsiToRgi, modHsi, rgaToHsi } from '@palett/convert'
import { Pres }                                 from '../src/Pres.js'


const hsiUpward = (hsi) => {
  const dh = betw(-16, 16)
  const ds = betw(-8, 8)
  const dl = betw(-8, 24)
  return modHsi(hsi, dh, ds, dl)
}

const hsiReverse = (hsi) => {
  const dh = betw(150, 210)
  const ds = betw(-32, -24)
  const dl = betw(+16, +32)
  return modHsi(hsi, dh, ds, dl)
}

const rgiReverse = (rgi) => {
  const r = rgi >> 16 & 0xFF, g = rgi >> 8 & 0xFF, b = rgi >> 0 & 0xFF
  const hsi0 = rgaToHsi(r, g, b)
  const dh = betw(150, 210)
  const ds = betw(-32, -24)
  const dl = betw(+16, +32)
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