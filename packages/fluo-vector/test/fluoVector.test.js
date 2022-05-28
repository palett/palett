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
      Object.assign({}, FRESH, { effects: [BOLD, ITALIC, UNDERLINE] }),
      Object.assign({}, PLANET, { effects: [BOLD, ITALIC, UNDERLINE] })
    ]
    // [
    //   { preset: FRESH, by: isNumeric, to: x => x },
    //   { preset: PLANET, by: isLiteral, to: stringValue }
    // ]
  )
    |> decoPale |> console.log
  // |> says[k]
}

