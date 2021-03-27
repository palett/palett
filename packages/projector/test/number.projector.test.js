import { bound }             from '@aryth/bound-vector'
import { VectorCollection }  from '@foba/vector-number'
import { BOLD, ITALIC }      from '@palett/enum-font-effects'
import { FRESH }             from '@palett/presets'
import { says }              from '@spare/logger'
import { Colorant, Pigment } from '../index'

const EFFECTS = { effects: [BOLD, ITALIC] }

for (const [key, vecFunc] of Object.entries(VectorCollection)) {
  const vec = vecFunc(7)
  const { max, min } = bound(vec)
  const dye = Pigment({ max, min }, Object.assign({}, FRESH, EFFECTS))
  vec.map(dye) |> says[key]
}

for (const [key, vecFunc] of Object.entries(VectorCollection)) {
  const vec = vecFunc(7)
  const { max, min } = bound(vec)
  const dye = Colorant({ max, min }, Object.assign({}, FRESH, EFFECTS))
  vec.map(dye) |> says[key]
}
