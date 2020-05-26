import { simpleVectors } from '@foba/foo'
import { ATLAS }         from '@palett/presets'
import { delogger }      from '@spare/deco'
import { logger }        from '@spare/logger'
import { fluoVector }    from '../src/fluoVector'

const SimpleVectors = simpleVectors({ h: 16 })
SimpleVectors.another = ['A', 'B', 'C', 'x', 'y', 'z', ' ']
SimpleVectors.countries = ['GBR', 'KOR', 'JPN', 'IND', 'DEU', 'CHN', 'USA']

for (let [k, vector] of Object.entries(SimpleVectors)) {
  k |> logger
  vector = vector.slice()
  fluoVector(vector, {
    mutate: false,
    colorant: false,
    stringPreset: ATLAS,
    // filter: x => x.trim().length > 0
  }) |> delogger
}
