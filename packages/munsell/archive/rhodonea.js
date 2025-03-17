import { Bound }            from '@aryth/bound'
import { finiteFlopper }    from '@aryth/flopper'
import { PetalNote, Polar } from '@aryth/polar'
import { init }             from '@vect/vector-init'
import { Munsell }          from '../src/Munsell.js'

const { PI, abs, round } = Math

export function rhodoneaPrim(hsi) {
  let h = (hsi >> 16) & 0x1FF, s = (hsi >> 8) & 0xFF, l = hsi & 0xFF
  s /= 2, l /= 2
  const conf = this ?? {}
  const { petals = 3, density = 0.01, minL = 0, devS = 18, munsell } = conf
  const polar = new Polar(l, h)
  const sbd = Bound.build(s - devS, s + devS)
  // console.log(polar, sbd)
  const area = PI * (l * l) / (petals % 2 === 0 ? 2 : 4)
  const tSize = round(density * area)
  const uSize = tSize / petals
  const stat = PetalNote.build(polar.θ, petals)
  const rest = init(petals, () => [])
  const list = []
  for (const curr of finiteFlopper(munsell.list.slice())) {
    let hc = (curr >> 16) & 0x1FF, sc = (curr >> 8) & 0xFF, lc = curr & 0xFF
    sc /= 2, lc /= 2
    if (lc < minL) continue
    if (polar.foliateRadius(hc, petals) < lc) continue
    const phase = stat.phase(hc)
    if (stat.bin[phase] >= uSize) continue
    if (sbd.has(sc)) {
      stat.notePhase(phase)
      list.push(curr)
      // console.log(polar.foliateRadius(hc, petals), lc)
    } else {
      // const dh = distance(h, hc)
      // const ds = abs(s - sc)
      // const dl = abs(l - lc)
      rest[phase].push(curr)
    }
    if (stat.count >= tSize) break
  }
  // console.log(stat.bin)
  // console.log(rest)
  // for (let [ phase, count ] of indexedBy(stat.bin, (_, count) => count < uSize)) {
  //   const temp = rest[phase]
  //   if (temp?.length) {
  //     for (let curr of temp.slice(0, uSize - count)) {
  //       if (curr > 0) list.push(curr)
  //     }
  //   }
  // }
  list.sort((a, b) => a - b)
  return list.map(Munsell.prototype.entry, munsell)
}