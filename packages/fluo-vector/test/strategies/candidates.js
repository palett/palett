import { simpleVectorCollection } from '@foba/foo'
import { VectorCollection }       from '@foba/vector-number'

export const candidates = {
  vector: simpleVectorCollection({ h: 8 }),
  alphas: [ 'A', 'B', 'C', 'x', 'y', 'z', ' ', '1', 2, 3 ],
  mirror: VectorCollection.absoluteMirror(),
  sole: [ '^1', '^1' ]
}
