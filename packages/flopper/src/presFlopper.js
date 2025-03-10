import { flop, randBetw }   from '@aryth/rand'
import { hexToHsi, modHsi } from '@palett/convert'
import { BOOK, Munsell }    from '@palett/munsell'
import { Pres }             from '@palett/pres'
import { indexed }          from '@vect/object-mapper'
import { seq }              from '@vect/vector'
import { narrowSL }         from './utils/color-utils.js'
import { shiftFlopper }     from './utils/shiftFlopper.js'

// const HUES = [ 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355 ]
const HUES = seq(60, i => i * 6, 0)
const SATURATIONS = [ 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60 ]
const LIGHTS = [ 42, 48, 54, 56, 57, 60, 62, 63, 66, 69, 72, 75 ]
const GRAYS = [ ...indexed(BOOK, narrowSL.bind({ sb: 0, sp: 14, lb: 92, lp: 216 }), k => k) ]
/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {{min:string, max:string, na:string, [name]:string}}
 */
export function randPres(hex, name) {
  const curr = hexToHsi(hex)
  const temp = modHsi(curr, randBetw(-15, 15), randBetw(-12, -3), randBetw(12, 27))
  const pres = Pres.build(hex, Munsell.nearestHex(temp) ?? temp, flop(GRAYS))
  if (name?.length) pres.name = name
  return pres
}


export function* presFlopper(exhausted = true) {
  const container = {}
  for (let s of shiftFlopper(SATURATIONS, 3, 3))
    for (let l of shiftFlopper(LIGHTS, 3, 3))
      for (let h of shiftFlopper(HUES, 1, 5)) {
        const entry = Munsell.nearestEntry((h & 0x1FF) << 16 | ((s * 2) & 0xFF) << 8 | (l * 2) & 0xFF)
        if (!entry) continue
        const [ hex, name ] = entry // console.log(hslToStr([ h, s, l ]), hslToStr(hexToHsl(hex)), 'rgb', rgbToStr(hexToRgb(hex)), name)
        if (name in container) continue
        container[name] = true
        yield randPres(hex, name)
      }
  const rest = {}
  while (!exhausted) {
    const hex = flop(GRAYS)
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(flop(GRAYS), hex))
  }
}

