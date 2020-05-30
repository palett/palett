import { simpleEntries } from '@foba/foo'
import { UNDERLINE }     from '@palett/enum-font-effects'
import { says }          from '@palett/says'
import { fluoEnt }       from '../src/fluoEnt'

const SimpleEntries = simpleEntries({ h: 15 })

for (const [key, entries] of Object.entries(SimpleEntries)) {
  fluoEnt(entries, [], [UNDERLINE]).map(([k, v]) => `${k} > ${v}`).join('\n')  |> says[key]
}
