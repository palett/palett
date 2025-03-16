import { Bound }             from '@aryth/bound'
import { finiteFlopper }     from '@aryth/flopper'
import * as pol              from '@aryth/polar'
import { PetalNote }         from '@aryth/polar'
import * as conv             from '@palett/convert'
import { hexToHsi }          from '@palett/convert'
import { iterate }           from '@vect/vector-mapper'
import { test }              from 'node:test'
import { Cova }              from '../archive/Cova.js'
import { HSL }               from '../archive/extends/HSL.js'
import { Midtone, rhodonea } from '../index.js'

const { PI, pow, abs, round } = Math

export function rhodoneaArch(
  hsl,
  {
    petals,
    density = 0.01,
    minL = 0,
    devS = 18,
  },
) {
  const polarMark = hsl.toPolar()
  const hexToHsl = Cova.hexToHsl.slice() // create shallow copy
  const sbd = Bound.build(hsl.s - devS, hsl.s + devS)
  const area = PI * pow(polarMark.r, 2) * (petals % 2 === 0 ? 0.5 : 0.25)
  // console.log(area)
  const maximum = round(density * area)
  const phaseThres = maximum / petals
  // console.log({ hsl, polarMark, petals })
  const petalNote = PetalNote.build(polarMark.θ, petals)
  const petalCache = {}
  for (let i = 1; i <= petals; i++) { petalCache[i] = [] }
  // const petalCache = enumerable.range(1, petals).toDictionary(i => i, i => new sortedList < float, string > ())
  const sortList = []
  const hslIndicator = (hsl) => hsl.h * 10000 + hsl.s * 100 + hsl.l
  let i = 0
  for (const [ hex, hsl ] of finiteFlopper(hexToHsl)) {
    i++
    let [ t, s, r ] = hsl
    if (r < minL) continue
    if (polarMark.foliateRadius(t, petals) < r) continue
    const phase = petalNote.phase(t)
    if (phaseThres <= petalNote.bin[phase]) continue
    if (sbd.has(s)) {
      petalNote.notePhase(phase)
      sortList.push([ hslIndicator(hsl), hex ])
    } else {
      const ds = abs(hsl.s - s)
      const dr = abs(hsl.l - r)
      const dt = pol.distance(hsl.h, t)
      petalCache[phase].push(ds * 100 + dr + dt / 360, hex)
    }
    if (maximum <= petalNote.count) break
  }
  iterate(petalNote.bin, (count, phase) => {
    if (count < phaseThres) {
      const cache = petalCache[phase]
      if (cache?.length) {
        for (let hex of cache.slice(0, phaseThres - count)) {
          sortList.push([ hslIndicator(conv.hexToHsl(hex)), hex ])
        }
      }
    }
  })
  sortList.sort(([ a ], [ b ]) => a - b)
  return sortList.map(([ _, hex ]) => [ hex, Cova.name(hex) ])
}


// Ash Rose #B5817D
// Waterfall #3AB0A2
test('flopper benchmark', () => {

  const candidates = {
    '#CA3422': 'Poinciana',
    '#B5817D': 'Ash Rose',
    '#3AB0A2': 'Waterfall',
    '#AAAAC4': 'Cosmic Sky',
    '#ECB2B3': 'Powder Pink',
    '#D75C5D': 'Spiced Coral',
  }

  const hex = '#8FB68F'

  const ARCH = 'hex → randPres - arch'
  const FUSE = 'hex → randPres - fuse'
  const EDGE = 'hex → randPres - edge'
  const NEXT = 'hex → randPres - next'

  const conf = {
    petals: 4,
    density: 0.01,
    minL: 48,
    devS: 18,
    munsell: Midtone,
  }

  const rhodoneaFuse = rhodonea.bind(conf)
  const hslArch = HSL.fromHex('#AAAAC4')
  const hsiFuse = hexToHsi(hex)
  const quant = 1e4
  console.log(ARCH, rhodoneaArch)
  console.log(FUSE, rhodoneaFuse(hsiFuse))
  // console.log(EDGE, MunEdge)
  // console.log(NEXT, MunFuse)

  console.time(ARCH)
  for (let i = 0; i < quant; i++) rhodoneaArch(hslArch, conf)
  console.timeEnd(ARCH)

  console.time(FUSE)
  for (let i = 0; i < quant; i++) rhodoneaFuse(hsiFuse)
  console.timeEnd(FUSE)

  // console.time(EDGE)
  // for (let i = 0; i < quant; i++) MunEdge.nearest(hsi)
  // console.timeEnd(EDGE)
  //
  // console.time(NEXT)
  // for (let i = 0; i < quant; i++) MunFuse.nearest(hsi)
  // console.timeEnd(NEXT)
})