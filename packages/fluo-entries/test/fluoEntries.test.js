import { simpleEntriesCollection } from '@foba/foo'
import { UNDERLINE }               from '@palett/enum-font-effects'
import { FRESH, PLANET }           from '@palett/presets'
import { says }                    from '@palett/says'
import { fluoEntries }             from '../src/fluoEntries'

const SimpleEntries = simpleEntriesCollection({ h: 15 })

for (const [key, entries] of Object.entries(SimpleEntries)) {
  fluoEntries(entries, {
    presets: [FRESH, PLANET],
    effects: [UNDERLINE]
  }).map(([k, v]) => `${k} > ${v}`).join('\n')  |> says[key]
}
