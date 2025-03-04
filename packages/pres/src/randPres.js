import { lim0up, limBy, rec0up } from '@aryth/math'
import { randBetw }              from '@aryth/rand'
import { hexOntoHsl, hslToInt }  from './algebra.js'
import { Pres }                  from './Pres.js'

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {Pres}
 */
export const randPres = (hex, name) => {
  const pres = new Pres()
  hexOntoHsl(hex, pres, 0)
  pres[3] = rec0up(pres[0] + randBetw(-12, 12), 360)
  pres[4] = lim0up(pres[1] + randBetw(-5, 10), 100)
  pres[5] = lim0up(pres[2] + randBetw(6, 18), 100)
  pres.nan = hslToInt(
    rec0up(pres[0] + 180, 360),
    limBy(pres[1] - 32, 5, 90),
    limBy(pres[2] + 24, 40, 96)
  )
  if (name?.length) pres.name = name
  return pres
}