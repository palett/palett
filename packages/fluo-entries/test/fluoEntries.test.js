import { simpleEntriesCollection } from '@foba/foo'
import { UNDERLINE }               from '@palett/enum-font-effects'
import { FRESH, PLANET }           from '@palett/presets'
import { decoPale, logger }        from '@spare/logger'
import { fluoEntries }             from '../src/fluoEntries'

const SimpleEntries = simpleEntriesCollection({ h: 15 })

for (const [key, entries] of Object.entries(SimpleEntries)) {
  fluoEntries(entries, [
    { preset: FRESH },
    { preset: PLANET, effects: [UNDERLINE] }
  ])
    // .map(([k, v]) => `${k} > ${v}`).join('\n')
    |> decoPale
    |> logger
  // says[key]
}
