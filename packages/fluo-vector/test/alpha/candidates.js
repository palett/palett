import { simpleVectors }    from '@foba/foo'
import { VectorCollection } from '@foba/vector-number'

const SimpleVectors = simpleVectors({ h: 8 })
delete SimpleVectors.empty
SimpleVectors.another = ['A', 'B', 'C', 'x', 'y', 'z', ' ', '1', 2, 3]
SimpleVectors.absoluteMirror = VectorCollection.absoluteMirror()
SimpleVectors.sole = ['^1', '^1']

export const candidates = SimpleVectors
