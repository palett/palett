import { COLUMNWISE, POINTWISE, ROWWISE } from '@vect/enum-matrix-directions'
import { init }                           from '@vect/matrix'
import { fluoMatrix }                     from '../src/fluoMatrix'
import { simpleMatrixCollection }         from '@foba/foo'
import { PresetCollection }               from '@palett/fluo'
import { FRESH, LAVA }                    from '@palett/presets'
import { BOLD, ITALIC, UNDERLINE }        from '@palett/enum-font-effects'
import { RENDER }                         from '@palett/enum-colorant-modes'
import { METRO }                          from 'palett-presets'
import { indexed }                        from '@vect/object-mapper'

// const SimpleMatrices = {}
const SimpleMatrices = simpleMatrixCollection({ h: 6, w: 12 })
SimpleMatrices.alphabetical = init(4, 7, (x, y) => String.fromCharCode(63 + (x * 7) + y))

SimpleMatrices.another = [
  [1, 2, 3],
  ['a', 'b', 'c']
]

const CONTEXT = { colorant: RENDER }
'fluoMatrix' |> console.log
for (const [key, mx] of indexed(SimpleMatrices)) {
  const presets = PresetCollection.build(FRESH).assignEffect(BOLD)
  fluoMatrix.call(CONTEXT, mx, POINTWISE, presets) |> console.log
  '' |> console.log
}

'fluoRows' |> console.log
for (const [key, mx] of indexed(SimpleMatrices)) {
  const presets = PresetCollection.build(METRO).assignEffect(ITALIC)
  fluoMatrix.call(CONTEXT, mx, ROWWISE, presets) |> console.log
  '' |> console.log
}

'fluoColumns' |> console.log
for (const [key, mx] of indexed(SimpleMatrices)) {
  const presets = PresetCollection.build(LAVA).assignEffect(UNDERLINE)
  fluoMatrix.call(CONTEXT, mx, COLUMNWISE, presets) |> console.log
  '' |> console.log
}
