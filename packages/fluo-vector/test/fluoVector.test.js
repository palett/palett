import { BOLD, ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { FRESH, METRO, PLANET }    from '@palett/presets'
import { decoPale }                from '@spare/logger'
import { test }                    from 'node:test'
import { fluoVector }              from '../index.js'
import { candidates }              from './strategies/candidates.js'

test('fluoVector', () => {
  for (let [ k, vector ] of Object.entries(candidates)) {
    console.log(k)
    const result = decoPale(fluoVector.call(
      { mutate: false, mode: 'render' },
      vector,
      [
        Object.assign({}, FRESH, { effects: [ BOLD, ITALIC, UNDERLINE ] }),
        Object.assign({}, METRO, { effects: [ BOLD, ITALIC, UNDERLINE ] }),
        Object.assign({}, PLANET, { effects: [ BOLD, ITALIC, UNDERLINE ] }),
      ],
      // [
      //   { preset: FRESH, by: isNumeric, to: oneself },
      //   { preset: PLANET, by: isLiteral, to: stringValue }
      // ]
    ))
    console.log(result)
  }
})
