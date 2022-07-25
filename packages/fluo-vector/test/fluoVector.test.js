import { BOLD, ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { FRESH, METRO, PLANET }    from '@palett/presets'
import { decoPale }                from '@spare/logger'
import { fluoVector }              from '../index.js'
import { candidates }              from './strategies/candidates'

for (let [ k, vector ] of Object.entries(candidates)) {
  k |> console.log
  fluoVector.call(
    { mutate: false, mode: 'render' },
    vector,
    [
      Object.assign({}, FRESH, { effects: [ BOLD, ITALIC, UNDERLINE ] }),
      Object.assign({}, METRO, { effects: [ BOLD, ITALIC, UNDERLINE ] }),
      Object.assign({}, PLANET, { effects: [ BOLD, ITALIC, UNDERLINE ] })
    ]
    // [
    //   { preset: FRESH, by: isNumeric, to: oneself },
    //   { preset: PLANET, by: isLiteral, to: stringValue }
    // ]
  )
    |> decoPale |> console.log
  // |> says[k]
}

