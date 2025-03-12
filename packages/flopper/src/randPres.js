import { flop, randBetw } from '@aryth/rand'
import { dslHex }         from '@palett/color-algebra'
import { modHsi }         from '@palett/convert'
import { Pres }           from '@palett/pres'
import { LOTONE }         from './fake-book.js'

const LOTONE_LIST = Object.keys(LOTONE)

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns Pres
 */
export function randPres(hex, name) {
  const next = dslHex(hex, randBetw(-12, -3), randBetw(12, 27))
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
  const next = modHsi(hsiA, randBetw(-15, 15), randBetw(-12, -3), randBetw(12, 27))
  const hsiB = munsell.nearest(next) ?? next
  const gray = flop(LOTONE_LIST)
  return Pres.build(hsiA, hsiB, gray, null, munsell.name(hsiA))
}