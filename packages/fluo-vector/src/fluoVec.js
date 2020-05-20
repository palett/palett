import { bound }                  from '@aryth/bound-vector'
import { NUM_ASC, STR_ASC }       from '@aryth/comparer'
import { duorank }                from '@aryth/rank-vector'
import { FRESH, PLANET }          from '@palett/presets'
import { dyezip }                 from '@palett/util-fluo'
import { decoPale }               from '@spare/deco-pale'
import { logger }                 from '@spare/logger'
import { isLiteral }              from '@typen/literal'
import { isNumeric }              from '@typen/num-strict'
import { mutazip, zipper as zip } from '@vect/vector'

export const fluoVec = function (vector,
  x = { preset: FRESH, filter: isNumeric, comparer: NUM_ASC },
  y = { preset: PLANET, filter: isLiteral, comparer: STR_ASC },
) {
  const {
    mutate = false,
    colorant = false,
  } = this
  const values = duorank(vector, x, y)
  vector |> decoPale |> logger
  values |> decoPale |> logger
  // ([vector, values]) |> decoMatrix |> logger
  const zipper = mutate ? mutazip : zip
  return dyezip.call({ colorant, zipper, bound }, vector, values, x.preset, y.preset)
}


