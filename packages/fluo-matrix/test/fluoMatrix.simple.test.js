import { RENDER }                  from '@palett/enum-colorant-modes'
import { BOLD, ITALIC, UNDERLINE } from '@palett/enum-font-effects'
import { PresetCollection }        from '@palett/fluo'
import { FRESH, LAVA, METRO }             from '@palett/presets'
import { decoPale, logger }               from '@spare/logger'
import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { fluoMatrix }                     from '../src/fluoMatrix'

const matrix = [
  [1, 2, 3],
  ['a', 'b', 'c']
]

const env = { colorant: RENDER }
'fluoMatrix' |> logger

fluoMatrix.call(
  env,
  matrix,
  POINTWISE,
  PresetCollection.build(FRESH).assignEffect(BOLD)
)
  |> decoPale |> logger
// |> decoMatrix |> says[key]O
'' |> logger


'fluoRows' |> logger

fluoMatrix.call(
  env,
  matrix,
  ROWWISE,
  PresetCollection.build(METRO).assignEffect(ITALIC)
)
  |> decoPale |> logger
// |> decoMatrix |> says[key]
'' |> logger


'fluoColumns' |> logger
fluoMatrix.call(
  env,
  matrix,
  COLUMNWISE,
  PresetCollection.build(LAVA).assignEffect(UNDERLINE)
)
  |> decoPale |> logger
// |> decoMatrix |> says[key]
'' |> logger
