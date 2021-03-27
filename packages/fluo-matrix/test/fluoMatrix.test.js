import { simpleMatrixCollection }         from '@foba/foo'
import { BOLD, ITALIC, UNDERLINE }        from '@palett/enum-font-effects'
import { FRESH, LAVA, METRO }             from '@palett/presets'
import { says }                           from '@spare/logger'
import { decoMatrix, logger }             from '@spare/logger'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { init }                           from '@vect/matrix'
import { fluoMatrix }                     from '../src/fluoMatrix'

const SimpleMatrices = simpleMatrixCollection({ h: 6, w: 12 })
SimpleMatrices.alphabetical = init(4, 7, (x, y) => String.fromCharCode(63 + (x * 7) + y))

SimpleMatrices.another = [
  [1, 2, 3],
  ['a', 'b', 'c']
]

'fluoMatrix' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluoMatrix.call({ colorant: false }, matrix, {
    direct: POINTWISE,
    presets: [FRESH],
    effects: [BOLD]
  }) |> decoMatrix |> says[key]
  '' |> logger
}

'fluoRows' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluoMatrix.call({ colorant: false }, matrix, {
      direct: ROWWISE,
      presets: [METRO],
      effects: [ITALIC]
    }
  ) |> decoMatrix |> says[key]
  '' |> logger
}

'fluoColumns' |> logger
for (const [key, matrix] of Object.entries(SimpleMatrices)) {
  fluoMatrix.call({ colorant: false }, matrix, {
      direct: COLUMNWISE,
      presets: [LAVA],
      effects: [UNDERLINE]
    }
  ) |> decoMatrix |> says[key]
  '' |> logger
}
