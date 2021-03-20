import { simpleMatrixCollection }         from '@foba/foo'
import { RENDER }                         from '@palett/enum-colorant-modes'
import { BOLD, ITALIC, UNDERLINE }        from '@palett/enum-font-effects'
import { FRESH, LAVA, METRO }             from '@palett/presets'
import { decoPale, logger }               from '@spare/logger'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { init }                           from '@vect/matrix'
import { fluoMatrix }                     from '../src/fluoMatrix'

// const SimpleMatrices = {}
const SimpleMatrices = simpleMatrixCollection({ h: 6, w: 12 })
SimpleMatrices.alphabetical = init(4, 7, (x, y) => String.fromCharCode(63 + (x * 7) + y))

SimpleMatrices.another = [
  [1, 2, 3],
  ['a', 'b', 'c']
]

const environment = { colorant: RENDER }
'fluoMatrix' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluoMatrix.call(
    environment,
    matrix,
    POINTWISE,
    [{ preset: FRESH, effects: [BOLD] }]
  )
    |> decoPale |> logger
  // |> decoMatrix |> says[key]O
  '' |> logger
}

'fluoRows' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluoMatrix.call(
    environment,
    matrix,
    ROWWISE,
    [{ preset: METRO, effects: [ITALIC] }]
  )
    |> decoPale |> logger
  // |> decoMatrix |> says[key]
  '' |> logger
}

'fluoColumns' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluoMatrix.call(
    environment,
    matrix,
    COLUMNWISE,
    [{ preset: LAVA, effects: [UNDERLINE] }]
  )
    |> decoPale |> logger
  // |> decoMatrix |> says[key]
  '' |> logger
}
