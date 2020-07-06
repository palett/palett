import { BOLD, ITALIC } from '@palett/enum-font-effects'
import { PLANET }       from '@palett/presets'
import { says }         from '@palett/says'
import { fluoVector }   from '../src/fluoVector'
import { candidates }   from './strategies/candidates'

for (let [k, vector] of Object.entries(candidates)) {
  fluoVector.call({ mutate: false, colorant: false },
    vector,
    [undefined, PLANET],
    [BOLD, ITALIC]
    // [
    //   { preset: FRESH, filter: isNumeric, mapper: x => x },
    //   { preset: PLANET, filter: isLiteral, mapper: stringValue }
    // ]
  ) |> says[k]
}
