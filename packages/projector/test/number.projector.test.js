import { bound }            from '@aryth/bound-vector'
import { VectorCollection } from '@foba/vector-number'
import { BOLD, ITALIC }     from '@palett/enum-font-effects'
import { FRESH }            from '@palett/presets'
import { logger }           from '@spare/logger'
import { Pigment }          from '../src/Pigment'

for (const [key, vecFunc] of Object.entries(VectorCollection)) {
  const vec = vecFunc(7)
  const { max, min } = bound(vec)
  const dye = Pigment({ max, min }, FRESH, [BOLD, ITALIC])
  vec.map(dye) |> logger
  // vec.map(dye) |> says[key]
}
