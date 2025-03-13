import { flop }                from '@aryth/rand'
import { Munsell }             from '@palett/munsell'
import { seq }                 from '@vect/vector'
import { LOTONE }              from './asset/LOTONE.js'
import { MIDTONE }             from './asset/MIDTONE.js'
import { blendPres, randPres } from './randPres.js'
import { finiteShifter }       from './utils/finiteShifter.js'

// const HUES = [ 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355 ]

export const HUES = seq(60, i => i * 6, 0)
export const SATURATIONS = [ 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60 ]
export const LIGHTS = [ 42, 48, 54, 56, 57, 60, 62, 63, 66, 69, 72, 75 ]

export function* presShifter(exhausted = true) {
  const conf = this ?? {}
  const munsell = Munsell.build(conf?.flow ?? MIDTONE, 24, 24), dock = {}
  let name
  for (let s of finiteShifter(SATURATIONS.slice(), 3, 3))
    for (let l of finiteShifter(LIGHTS.slice(), 3, 3))
      for (let h of finiteShifter(HUES.slice(), 1, 6)) {
        const pres = blendPres.call(munsell, (h & 0x1FF) << 16 | ((s * 2) & 0xFF) << 8 | (l * 2) & 0xFF)
        if (pres === null || ((name = pres.name) in dock)) continue // console.log(hslToStr([ h, s, l ]), hslToStr(hexToHsl(hex)), 'rgb', rgbToStr(hexToRgb(hex)), name)
        dock[name] = true
        yield pres
      }
  const dry = conf?.dry ?? (Object.entries(LOTONE)), rest = {}
  while (!exhausted) {
    const [ hex, name ] = flop(dry)
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name))
  }
}

