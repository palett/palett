import { flop, betw }                           from '@aryth/rand'
import { ff, hexToHsi, hexToHsl, hsiToHex, modHsi } from '@palett/convert'
import { HSL, Munsell, PRODUCTS }                   from '@palett/munsell'
import { Pres }                                     from '@palett/pres'
import { indexed }                                  from '@vect/object-mapper'
import { seq }                                      from '@vect/vector'
import { test }                                     from 'node:test'

const HUES = seq(36, i => i * 10 + 5, 0)
// const SATURATIONS_PREV = [ 72, 64, 56, 48, 40, 80 ]
const SATURATIONS = [ 48, 54, 42, 60, 36 ]
const LIGHTS = [ 48, 56, 64, 72, 40, 32 ]
const GRAYS = [ ...indexed(PRODUCTS, validSL.bind({ sb: 0, sp: 62, lb: 92, lp: 216 }), k => k) ]
function validSL(hex) {
  const sb = this.sb, sp = this.sp, lb = this.lb, lp = this.lp
  const r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5)
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  let ll = hi + lo
  if (ll <= (lb << 1) || (lp << 1) << ll) return false
  const df = hi - lo,
    s = !df ? 0 : (df << 8) / (ll > 255 ? (510 - ll) : ll) // s ∈ [0,512)
  return (sb < s && s < sp) // Return true if saturation is less than thresS
}

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {{min:string, max:string, na:string, [name]:string}}
 */
export const randPres_epic = (hex, name) => {
  const [ h, s, l ] = hexToHsl(hex)
  const [ max, _ ] = HSL
    .of(h + betw(-12, 12), s + betw(-12, -4), l + betw(8, 24))
    .restrict()
    .nearest()
  const gray = flop(GRAYS)
  const preset = Pres.build(hex, max, gray)
  if (name?.length) preset.name = name
  return preset
}

export const randPres_edge = (hex, name) => {
  const hsi0 = hexToHsi(hex)
  const temp = modHsi(hsi0, betw(-12, 12), betw(-12, -4), betw(8, 24))
  const hsi1 = Munsell.nearest(temp)
  const gray = flop(GRAYS)
  const preset = Pres.build(hex, hsiToHex(hsi1), gray)
  if (name?.length) preset.name = name
  return preset
}


test('flopper benchmark', () => {
  const hex = '#9ED9CC'
  const name = 'Spearmint'

  const TEST_EPIC = 'hex → randPres - epic'
  const TEST_EDGE = 'hex → randPres - edge'
  const TEST_NEXT = 'hex → randPres - next'

  const quant = 1e4
  console.log(TEST_EPIC, randPres_epic(hex, name))
  console.log(TEST_EDGE, randPres_edge(hex, name))
  // console.log(TEST_NEXT, randPres_edge(hex, name))

  console.time(TEST_EPIC)
  for (let i = 0; i < quant; i++) randPres_epic(hex, name)
  console.timeEnd(TEST_EPIC)

  console.time(TEST_EDGE)
  for (let i = 0; i < quant; i++) randPres_edge(hex, name)
  console.timeEnd(TEST_EDGE)

  // console.time(TEST_NEXT)
  // for (let i = 0; i < quant; i++) randPres(hex, name)
  // console.timeEnd(TEST_NEXT)

})