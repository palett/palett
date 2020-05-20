import { bound }        from '@aryth/bound-vector'
import { LAVA, PLANET } from '@palett/presets'
import { says }         from '@palett/says'
import { decoPale }     from '@spare/deco-pale'
import { mapper }       from '@vect/vector-mapper'
import { zipper }       from '@vect/vector-zipper'
import { fluo }         from '../src/fluo/fluo'

const candidates = {
  mixed: [3, 2, 1, 0, NaN, -1, -2, -3],
  positive: [3, 2, 1, 0, NaN],
  negative: [NaN, -1, -2, -3],
}

for (const [key, vec] of Object.entries(candidates)) {
  fluo.call({
    mapper: mapper,
    zipper: zipper,
    bound: bound,
    colorant: false,
  }, vec, vec, LAVA, PLANET,)
    |> decoPale
    |> says[key]
}
