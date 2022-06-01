import { bound }            from '@aryth/bound-vector'
import { VectorCollection } from '@foba/vector-number'
import { hslToHex }     from '@palett/convert'
import { BOLD, ITALIC } from '@palett/enum-font-effects'
import { FRESH }        from '@palett/presets'
import { says }             from '@spare/logger'
import { ProjectorFactory } from '../index'

for (const [key, vecFunc] of Object.entries(VectorCollection)) {
  const vec = vecFunc(7)
  const { max, min } = bound(vec)
  const projector = ProjectorFactory.build({ max, min }, FRESH, [BOLD, ITALIC])
  vec.map(n => projector.project(n) |> hslToHex) |> says[key]
}

for (const [key, vecFunc] of Object.entries(VectorCollection)) {
  const vec = vecFunc(7)
  const { max, min } = bound(vec)
  const projector = ProjectorFactory.build({ max, min }, FRESH, [BOLD, ITALIC])
  vec.map(n => projector.render(n, n)) |> says[key]
}
