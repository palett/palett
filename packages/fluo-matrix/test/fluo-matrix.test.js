import { simpleMatrices } from '@foba/foo'
import { fluoColumns, fluoMatrix, fluoRows } from '../index'
import { logger } from '@spare/logger'
import { delogger } from '@spare/deco'

const SimpleMatrices = simpleMatrices({ h: 6, w: 12 })
'fluoMatrix' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  key |> logger
  fluoMatrix(matrix) |> delogger
  '' |> logger
}

'fluoRows' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  key |> logger
  fluoRows(matrix) |> delogger
  '' |> logger
}

'fluoColumns' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  key |> logger
  fluoColumns(matrix) |> delogger
  '' |> logger
}
