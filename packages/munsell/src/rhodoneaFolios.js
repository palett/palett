import { Bound }         from '@aryth/bound'
import { finiteFlopper } from '@aryth/flopper'
import * as pol          from '@aryth/polar'
import { PetalNote }     from '@aryth/polar'
import * as conv         from '@palett/convert'
import { iterate } from '@vect/vector-mapper'
import { Cuvette } from './Cuvette'
import { Domain }  from './Domain'

const { PI, pow, abs, round } = Math

// list<(string hex, string name)>
export function rhodoneaFolios(
  hsl,
  {
    petals,
    density = 0.01,
    lightMinimum = 0,
    saturTolerance = 18,
    domain = Domain.fashion
  }
) {
  const cuvette = Cuvette.selectCuvette(domain)
  const polarMark = hsl.toPolar()
  const hexToHsl = cuvette.hexToHsl.slice() // create shallow copy
  const saturInterval = Bound.build(hsl.s - saturTolerance, hsl.s + saturTolerance)
  const minL = lightMinimum
  const area = PI * pow(polarMark.r, 2) * (petals % 2 === 0 ? 0.5 : 0.25)
  const maximum = round(density * area)
  const thresholdPerPhase = maximum / petals
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
    if (thresholdPerPhase <= petalNote.counter[phase]) continue
    if (saturInterval.has(s)) {
      petalNote.notePhase(phase)
      sortList.push([ hslIndicator(hsl), hex ])
    }
    else {
      const ds = abs(hsl.s - s)
      const dr = abs(hsl.l - r)
      const dt = pol.distance(hsl.h, t)
      petalCache[phase].push(ds * 100 + dr + dt / 360, hex)
    }
    if (maximum <= petalNote.sum) break
  }
  iterate(petalNote.counter, ([ phase, count ]) => {
    if (count < thresholdPerPhase) {
      const cache = petalCache[phase]
      if (cache?.length) {
        for (let hex of cache.values.slice(0, thresholdPerPhase - count)) {
          sortList.push([ hslIndicator(conv.hexToHsl(hex)), hex ])
        }
      }
    }
  })
  sortList.sort(([ a, ], [ b, ]) => a - b)
  return sortList.map(([ _, hex ]) => [ hex, cuvette.name(hex) ])
}