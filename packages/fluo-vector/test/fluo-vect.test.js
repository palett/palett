import { fluoVector } from '../src/fluoVector'
import { logger } from '@spare/logger'
import { simpleVectors } from '@foba/foo'
import { delogger } from '@spare/deco'

const SimpleVectors = simpleVectors({ h: 16 })
for (let [k, vector] of Object.entries(SimpleVectors)) {
  k |> logger
  vector = vector.slice()
  fluoVector(vector, { mutate: false, colorant: false }) |> delogger
}
