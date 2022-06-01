import { simpleMatrixCollection }  from '@foba/foo'
import { RENDER }                  from '@palett/enum-colorant-modes'
import { BOLD, ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { PresetCollection }        from '@palett/fluo'
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
    PresetCollection.build(FRESH).assignEffect(BOLD)
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
    PresetCollection.build(METRO).assignEffect(ITALIC)
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
    PresetCollection.build(LAVA).assignEffect(UNDERLINE)
  )
    |> decoPale |> logger
  // |> decoMatrix |> says[key]
  '' |> logger
}
