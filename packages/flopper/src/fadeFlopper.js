import { rand }      from '@aryth/rand'
import { Munsell }   from '@palett/munsell'
import { MIDTONE }   from './asset/MIDTONE.js'
import { norm }      from './utils/normDist.js'
import { randHSI }   from './utils/randHSI.js'
import { hsiToPres } from './utils/randPres.js'

const { log10 } = Math


export function* fadeFlopper(count) {
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48)
  const step = count > 120 ? 0.5 : 60 / count
  let i = 0, prev = rand(360)
  const stdev = step < 1 ? 0.5 : 2 * log10(step) + 0.5
  while (i++ < count) {
    const curr = prev + norm(step, stdev)
    yield hsiToPres.call(munsell, randHSI(curr))
    prev = curr
  }
}

