import { simpleMatrices } from '@foba/foo'
import { fluoColumns, fluoMatrix, fluoRows } from '../index'
import { logger } from '@spare/logger'
import { delogger } from '@spare/deco'
import { POINTWISE, COLUMNWISE, ROWWISE, ini } from '@vect/matrix'
import { fluo } from '../src/fluo'

const SimpleMatrices = simpleMatrices({ h: 6, w: 12 })
SimpleMatrices.alphabetical = ini(4, 7, (x, y) => String.fromCharCode(63 + (x * 7) + y))

'fluoMatrix' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  key |> logger
  fluo(matrix, { direct: POINTWISE }) |> delogger
  '' |> logger
}

'fluoRows' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  key |> logger
  fluo(matrix, { direct: ROWWISE }) |> delogger
  '' |> logger
}

'fluoColumns' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  key |> logger
  fluo(matrix, { direct: COLUMNWISE }) |> delogger
  '' |> logger
}
