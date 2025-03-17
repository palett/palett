import { flop }                from '@aryth/rand'
import { Munsell }             from '@palett/munsell'
import { seq }                 from '@vect/vector-init'
import { LOTONE }              from './asset/LOTONE.js'
import { MIDTONE }             from './asset/MIDTONE.js'
import { finiteShifter }       from './utils/finiteShifter.js'
import { blendPres, randPres } from './utils/randPres.js'

export const HUES = seq(60, i => i * 6, 0)
export const SATURATIONS = [ 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60 ]
export const LIGHTS = [ 42, 48, 54, 56, 57, 60, 62, 63, 66, 69, 72, 75 ]

export function* shiftFlopper(exhausted = true) {
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48), dock = {}
  let name
  for (let s of finiteShifter(SATURATIONS.slice(), 3, 3))
    for (let l of finiteShifter(LIGHTS.slice(), 3, 3))
      for (let h of finiteShifter(HUES.slice(), 1, 6)) {
        const pres = blendPres.call(munsell, (h & 0x1FF) << 16 | ((s * 2) & 0xFF) << 8 | (l * 2) & 0xFF)
        if (pres === null || ((name = pres.name) in dock)) continue // console.log(hslToStr([ h, s, l ]), hslToStr(hexToHsl(hex)), 'rgb', rgbToStr(hexToRgb(hex)), name)
        dock[name] = true
        yield pres
      }
  const dry = Object.entries(LOTONE), rest = {}
  while (!exhausted) {
    const [ hex, name ] = flop(dry)
    yield hex in rest ? rest[hex] : (rest[hex] = randPres(hex, name))
  }
}
