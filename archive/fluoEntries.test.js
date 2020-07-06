import { simpleEntries } from '@foba/foo'
import { says }        from '@palett/says'
import { fluoEntries } from '@palett/fluo-entries/src/fluoEntries'

const SimpleEntries = simpleEntries({ h: 15 })

for (const [key, entries] of Object.entries(SimpleEntries)) {
  fluoEntries(entries).map(([k, v]) => `${k} > ${v}`).join('\n')  |> says[key]
}
