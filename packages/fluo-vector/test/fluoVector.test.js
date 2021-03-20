import { BOLD, ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { FRESH, PLANET }           from '@palett/presets'
import { decoPale }                from '@spare/logger'
import { fluoVector }              from '../src/fluoVector'
import { candidates }              from './strategies/candidates'

for (let [k, vector] of Object.entries(candidates)) {
  k |> console.log
  fluoVector.call(
    { mutate: false, colorant: false },
    vector,
    [
      { preset: FRESH, effects: [BOLD, ITALIC, UNDERLINE] },
      { preset: PLANET, effects: [BOLD, ITALIC, UNDERLINE] }
    ]
    // [
    //   { preset: FRESH, filter: isNumeric, mapper: x => x },
    //   { preset: PLANET, filter: isLiteral, mapper: stringValue }
    // ]
  )
    |> decoPale |> console.log
    // |> says[k]
}

