import { simpleMatrices }                 from '@foba/foo'
import { BOLD, ITALIC, UNDERLINE }        from '@palett/enum-font-effects'
import { says }                           from '@palett/says'
import { decoMatrix, logger }             from '@spare/logger'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { ini }                            from '@vect/matrix'
import { fluoMatrix }                     from '../index'
import { fluo }                           from '../src/beta/fluo'

const SimpleMatrices = simpleMatrices({ h: 6, w: 12 })
SimpleMatrices.alphabetical = ini(4, 7, (x, y) => String.fromCharCode(63 + (x * 7) + y))

SimpleMatrices.another = [
  [1, 2, 3],
  ['a', 'b', 'c']
]

'fluoMatrix' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluo.call({ colorant: false }, matrix, POINTWISE, [], [BOLD]) |> decoMatrix |> says[key]
  '' |> logger
}

'fluoRows' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluo.call({ colorant: false }, matrix, ROWWISE, [], [ITALIC]) |> decoMatrix |> says[key]
  '' |> logger
}

'fluoColumns' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluo.call({ colorant: false }, matrix, COLUMNWISE, [], [UNDERLINE]) |> decoMatrix |> says[key]
  '' |> logger
}
