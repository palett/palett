import { finiteFlopper }    from '@aryth/flopper'
import { PetalNote, Polar } from '@aryth/polar'
import { flop }             from '@aryth/rand'
import { Munsell }          from '@palett/munsell'
import { init }             from '@vect/vector-init'
import { MIDTONE }          from './asset/MIDTONE.js'
import { circSlice }        from './utils/iter-utils.js'
import { hsiToPres }        from './utils/randPres.js'

const { PI, round } = Math

// entries<(string hex, string name)>
export function* rhodFlopper(hsi, exhausted = true) {
  const { petals = 3, density = 0.01, minL = 0, devS = 50, munsell: m } = this ?? {}
  const munsell = m instanceof Munsell ? m : Munsell.build(m ?? MIDTONE, 48, 48)
  const h0 = (hsi >> 16) & 0x1FF, s0 = (hsi >> 8) & 0xFF / 2, l0 = (hsi & 0xFF) / 2
  const polar = new Polar(l0, h0) // Create a Polar object
  const minS = s0 - devS, maxS = s0 + devS // Create a Bound object for saturation range
  const area = PI * (l0 * l0) / (petals % 2 === 0 ? 2 : 4) // Calculate the area of the rhodonea curve
  const tSize = round(density * area) // Calculate the total size of the result list
  const uSize = tSize / petals // Calculate the size per petal
  const stat = PetalNote.build(polar.θ, petals) // Create a PetalNote object for tracking phases
  const rest = init(petals, () => []) // Initialize an array to store remaining elements
  const hues = init(petals, i => (h0 + (360 / petals) * i) % 360) // Calculate hues for each petal
  const ranges = hues.map(hue => circSlice.call(munsell.list, munsell.range(hue, 3))) // Get ranges of munsell colors for each hue
  const flopSet = ranges.map(finiteFlopper) // Create flopper for each range
  let i = 0, phase
  while (i < tSize) {
    let empty = true
    for (let c = 0; c < flopSet.length; c++) {
      const { value, done } = flopSet[c].next()
      if (done) continue
      empty = false
      const h = (value >> 16) & 0x1FF, s = (value >> 8) & 0xFF / 2, l = (value & 0xFF) / 2
      if (l < minL) continue
      if (l > polar.foliateRadius(h, petals)) continue
      if (stat.bin[phase = stat.phase(h)] >= uSize) continue
      if (minS <= s && s <= maxS) {
        stat.notePhase(phase)
        yield hsiToPres.call(munsell, value)
        i++
      } else {
        rest[phase].push(hsiToPres.call(munsell, value))
      }
    }
    if (empty) break
  }
  if (!exhausted) {
    const restList = Object.values(rest).flat()
    if (restList.length) {
      while (true) yield flop(restList)
    } else {
      yield hsi
    }
  }
}