import { Bound }            from '@aryth/bound'
import { finiteFlopper }    from '@aryth/flopper'
import { PetalNote, Polar } from '@aryth/polar'
import { init }             from '@vect/vector-init'
import { Munsell }          from './Munsell.js'
import { slice }            from './utils/iter-utils.js'

const { PI, round } = Math

// entries<(string hex, string name)>
export function rhodoneaList(hsi) {
  const { petals = 3, density = 0.01, minL = 0, devS = 50, munsell } = this ?? {}
  const h0 = (hsi >> 16) & 0x1FF, s0 = (hsi >> 8) & 0xFF / 2, l0 = (hsi & 0xFF) / 2
  // Destructure configuration with default values
  const polar = new Polar(l0, h0) // Create a Polar object
  const sbd = Bound.build(s0 - devS, s0 + devS) // Create a Bound object for saturation range
  const area = PI * (l0 * l0) / (petals % 2 === 0 ? 2 : 4) // Calculate the area of the rhodonea curve
  const tSize = round(density * area) // Calculate the total size of the result list
  const uSize = tSize / petals // Calculate the size per petal
  const stat = PetalNote.build(polar.θ, petals) // Create a PetalNote object for tracking phases
  const rest = init(petals, () => []) // Initialize an array to store remaining elements
  const hues = init(petals, i => (h0 + (360 / petals) * i) % 360) // Calculate hues for each petal
  const ranges = hues.map(hue => slice.call(munsell.list, munsell.range(hue, 3))) // Get ranges of munsell colors for each hue
  const flopSet = ranges.map(finiteFlopper) // Create flopper for each range
  const list = [] // Initialize an array to store the final result
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
      if (sbd.has(s)) {
        stat.notePhase(phase)
        list.push(value)
        i++
      } else {
        rest[phase].push(value)
      }
    }
    if (empty) break
  }
  // Sort the list and map to Munsell entries
  return list.sort((a, b) => a - b).map(Munsell.prototype.entry, munsell)
}