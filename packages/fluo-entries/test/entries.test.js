import { delogger } from '@spare/deco'
import { simpleEntries } from '@foba/foo'
import { fluoEntries } from '../src/fluoEntries'
import { logger } from '@spare/logger'

const SimpleEntries = simpleEntries({ h: 15 })
SimpleEntries |> delogger

for (const [key, entries] of Object.entries(SimpleEntries)) {
  key |> logger
  fluoEntries(entries).map(([k, v]) => `${k} > ${v}`) |> delogger
}
