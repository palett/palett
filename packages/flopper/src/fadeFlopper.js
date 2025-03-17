import { round }     from '@aryth/math'
import { rand }      from '@aryth/rand'
import { Munsell }   from '@palett/munsell'
import { MIDTONE }   from './asset/MIDTONE.js'
import { norm }      from './utils/normDist.js'
import { hsiToPres } from './utils/randPres.js'

const { cos, PI, log10 } = Math
export const primS = (h) => 45 + 15 * cos(2 * PI * h / 180) // 24 - 54
export const primL = (h) => 54 + 12 * cos(PI * (h - 60) / 180) // 42 - 66
export const neonS = (h) => {
  if ((h %= 360) < 0) h += 360 // clamp to 0 to 360
  let s = 27 * cos((2 * PI / 180) * (h - 20)) + 57
  if (110 < h && h < 290) s = (s - 30) * 0.5 + 30
  return s
}
export const neonL = (h) => {
  return norm(72, 3)
}

function neonHSI(h) {
  let s = neonS(h), l = neonL(h)
  s += norm(0, 6)
  l += norm(0, 6)
  if ((h %= 360) < 0) h += 360
  return (round(h) & 0x1FF) << 16 | (round(s * 2) & 0xFF) << 8 | round(l * 2) & 0xFF
}

function primHSI(h) {
  let s = primS(h), l = primL(h)
  // h += abs(norm(0, 10))
  s += norm(-1, 3)
  l += norm(6, 6)
  if ((h %= 360) < 0) h += 360
  return (round(h) & 0x1FF) << 16 | (round(s * 2) & 0xFF) << 8 | round(l * 2) & 0xFF
}

export function* fadeFlopper(count) {
  const munsell = this instanceof Munsell ? this : Munsell.build(this ?? MIDTONE, 48, 48)
  const makeHSI = norm() > 0 ? primHSI : neonHSI
  const step = count > 120 ? 0.5 : 60 / count
  let i = 0, prev = rand(360)
  const stdev = step < 1 ? 0.5 : 2 * log10(step) + 0.5
  while (i++ < count) {
    const curr = prev + norm(step, stdev)
    yield hsiToPres.call(munsell, makeHSI(curr))
    prev = curr
  }
}

