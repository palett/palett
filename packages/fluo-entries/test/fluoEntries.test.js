import { simpleEntries } from '@foba/foo'
import { UNDERLINE }     from '@palett/enum-font-effects'
import { says }          from '@palett/says'
import { fluoEntries }   from '../src/fluoEntries'

const SimpleEntries = simpleEntries({ h: 15 })

for (const [key, entries] of Object.entries(SimpleEntries)) {
  fluoEntries(entries, [], [UNDERLINE]).map(([k, v]) => `${ k } > ${ v }`).join('\n')  |> says[key]
}
