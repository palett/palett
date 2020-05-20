import { NUM_ASC, STR_ASC } from '@aryth/comparer'
import { simpleVectors }    from '@foba/foo'
import { VectorCollection } from '@foba/vector-number'
import { FRESH, PLANET }    from '@palett/presets'
import { says }             from '@palett/says'
import { isLiteral }        from '@typen/literal'
import { isNumeric }        from '@typen/num-strict'
import { fluoVec }          from '../src/fluoVec'

const SimpleVectors = simpleVectors({ h: 16 })
SimpleVectors.another = ['A', 'B', 'C', 'x', 'y', 'z', ' ', '1', 2, 3]
SimpleVectors.absoluteMirror = VectorCollection.absoluteMirror()
SimpleVectors.sole = ['^1', '^1']
for (let [k, vector] of Object.entries(SimpleVectors)) {
  fluoVec.call(
    { mutate: false, colorant: false, },
    vector,
    { preset: FRESH, filter: isNumeric, comparer: NUM_ASC },
    { preset: PLANET, filter: isLiteral, comparer: STR_ASC }
  )
    |> says[k]
}
