import { betw, flop } from '@aryth/rand'
import { dslHex }     from '@palett/color-algebra'
import { modHsi }     from '@palett/convert'
import { Pres }       from '@palett/pres'
import { LOTONE }     from './asset/LOTONE.js'

const LOTONE_LIST = Object.keys(LOTONE)

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns Pres
 */
export function randPres(hex, name) {
  const next = dslHex(hex, betw(-12, -3), betw(9, 24))
  const gray = flop(LOTONE_LIST)
  return Pres.build(hex, next, gray, null, name)
}

/**
 * @param {number} hsi
 * @returns Pres
 */
export function blendPres(hsi) {
  const munsell = this
  const hsiA = munsell.nearest(hsi)
  if (!hsiA) return null
  const next = modHsi(hsiA, betw(-15, 15), betw(-12, -3), betw(9, 24))
  const hsiB = munsell.nearest(next) ?? next
  const gray = flop(LOTONE_LIST)
  return Pres.build(hsiA, hsiB, gray, null, munsell.name(hsiA))
}