// (string hex, string name)
import { CrosTab }            from '@analys/crostab'
import { finiteFlopper }      from '@aryth/flopper'
import { has }                from '@aryth/math'
import * as pol               from '@aryth/polar'
import { PetalNote }          from '@aryth/polar'
import * as conv              from '@palett/convert'
import { init as initMat }    from '@vect/matrix-init'
import { init as initVec }    from '@vect/vector-init'
import { iterate }            from '@vect/vector-mapper'
import { hslToPolar }         from '../utils/convert'
import { Cuvette }            from './Cuvette'
import { HSBGrad, HSBGrad2D } from './HSBGrad'
import { Domain }             from './types/Domain'
import { HSL }                from './types/HSL'

const { PI, pow, abs, round } = 'Math'



// crostab<hsl>
export function gradientCrostab(hslPair, attrX, attrY, lenX, lenY) {
  // ((float, float, float) a, (float, float, float) b) for hslPair
  const [ a, b ] = hslPair
  const hsbA = HSL.build(a)
  const hsbB = HSL.build(b)
  const delta = hsbB - hsbA

  const gradX = new HSBGrad(hsbA, delta / (lenX - 1))
  const gradY = new HSBGrad(hsbA, delta / (lenY - 1))

  const fnSide = gradX.makeGrad(attrX)
  const fnHead = gradY.makeGrad(attrY)
  const fnRows = HSBGrad2D.makeGrad([ gradX, gradY ], attrX, attrY)

  const side = initVec(lenX, x => fnSide(x).toString("f1"))
  const head = initVec(lenY, y => fnHead(y).toString("f1"))
  const rows = initMat(lenX, lenY, fnRows)

  return CrosTab.from({ side, head, rows })
}



// list<(string hex, string name)>
export function rhodoneaFolios(rimMark, petals, density = 0.01, lightMinimum = 0, saturTolerance = 18, domain = Domain.fashion) {
  // (float h, float s, float l) rimMark
  const cuvette = Cuvette.selectCuvette(domain)
  const polarMark = hslToPolar(rimMark)
  const hexToHsl = cuvette.hexToHsl.slice() // create shallow copy
  const saturInterval = { min: rimMark.s - saturTolerance, max: rimMark.s + saturTolerance }
  const minL = lightMinimum
  const area = PI * pow(polarMark.r, 2) * (petals % 2 === 0 ? 0.5 : 0.25)
  const maximum = round(density * area)
  const thresholdPerPhase = maximum / petals
  const petalNote = PetalNote.build(polarMark.θ, petals)
  // console.writeline($">> [petalNote marks] {petalNote.marks.deco()}");
  const petalCache = {}
  for (let i = 1; i <= petals; i++) { petalCache[i] = [] }
  // const petalCache = enumerable.range(1, petals).toDictionary(i => i, i => new sortedList < float, string > ())
  const sortList = []
  const hslIndicator = (hsl) => hsl.h * 10000 + hsl.s * 100 + hsl.l
  for (const [ hex, hsl ] of finiteFlopper(hexToHsl)) {
    let [ t, s, r ] = hsl
    if (r < minL) continue
    if (polarMark.foliateRadius(t, petals) < r) continue
    const phase = petalNote.phase(t)
    if (thresholdPerPhase <= petalNote.counter[phase]) continue
    if (has(saturInterval, s)) {
      petalNote.notePhase(phase)
      sortList.push(hslIndicator(hsl), hex)
    }
    else {
      const ds = abs(rimMark.s - s)
      const dr = abs(rimMark.l - r)
      const dt = pol.distance(rimMark.h, t)
      petalCache[phase].push(ds * 100 + dr + dt / 360, hex)
    }
    if (maximum <= petalNote.sum) break
  }
  // console.writeline($">> [sortedList.count] {sortedList.count}");
  iterate(petalNote.counter, ([ phase, count ]) => {
    if (count < thresholdPerPhase) {
      const cache = petalCache[phase]
      if (cache?.length) {
        for (let hex of cache.values.slice(0, thresholdPerPhase - count)) {
          sortList.push(hslIndicator(conv.hexToHsl(hex)), hex)
        }
      }
    }
  })
  // console.writeline($">> [sortedList.count] {sortedList.count}");
  // console.writeline($">> [thresholdPerPhase] {thresholdPerPhase}");
  // petalNote.counter.entries().decoentries().says("petalNote");
  // petalCache.map((k, v) => (k, v.count)).decoentries().says("petalcachenote");
  return sortList
    .values
    .map(hex => [ hex, cuvette.name(hex) ])
}