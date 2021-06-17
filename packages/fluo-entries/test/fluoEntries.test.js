import { simpleEntriesCollection } from '@foba/foo'
import { UNDERLINE }               from '@palett/enum-font-effects'
import { PresetCollection }        from '@palett/fluo'
import { FRESH, PLANET }           from '@palett/presets'
import { logger }                  from '@spare/logger'
import { fluoEntries }             from '../src/fluoEntries'

const SimpleEntries = simpleEntriesCollection({ h: 15 })

for (const [ key, entries ] of Object.entries(SimpleEntries)) {
  key |> logger
  const prettyEntries = fluoEntries(entries, PresetCollection.build(FRESH, PLANET).assignEffect(UNDERLINE))
  // prettyEntries  |> console.log
  prettyEntries.map(([ k, v ]) => `${ k } > ${ v }`).join('\n') |> console.log
}
