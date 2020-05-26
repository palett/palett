import { simpleMatrices }                    from '@foba/foo'
import { delogger }                          from '@spare/deco'
import { logger }                            from '@spare/logger'
import { COLUMNWISE, POINTWISE, ROWWISE }    from '@vect/enum-matrix-directions'
import { ini }                               from '@vect/matrix'
import { fluoColumns, fluoMatrix, fluoRows } from '../index'
import { fluo }                              from '../src/beta/fluo'

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
