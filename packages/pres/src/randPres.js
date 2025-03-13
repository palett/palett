import { flop, randBetw } from '@aryth/rand'
import { dslHex }         from '@palett/color-algebra'
import { Pres }           from './Pres.js'

export const LOTONE_LIST = [ '#847F7F', '#B0A29F', '#9A8E88', '#A79B8F', '#C0B7A4', '#ADAB9D', '#949484', '#939681', '#84887B', '#939A8D', '#878F83', '#7B8579', '#AAB0AA', '#9BA59D', '#909C94', '#929F99', '#7E8F89', '#9BA5A3', '#98A3A3', '#909A9C', '#8D969A', '#AEB2B6', '#A9ADB6', '#8A8B93', '#7E7E9A', '#8F8D9A', '#8F8A97', '#7F7787', '#817985', '#988C9B', '#817381', '#70656E', '#777276', '#979093', '#8B7D82', '#8E7F82' ]
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