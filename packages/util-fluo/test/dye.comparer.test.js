import { flop }          from '@aryth/rand'
import { rank, STR_ASC } from '@aryth/rank'
import { Foba }          from '@foba/vector-string'
import { Presets }       from '@palett/presets'
import { Visual }        from '@palett/visual/src/Visual'
import { deca }          from '@spare/deco'
import { logger }        from '@spare/logger'
import { zip }           from '@vect/vector'

export class DyeComparerTest {
  static test (arr, preset) {
    const ranks = rank(arr, STR_ASC)
    const dyes = Visual.vector(ranks, { mark: preset, retFn: true })
    zip(arr, dyes, (tx, dye) => tx |> dye) |> deca({ vu: 1 }) |> logger
  }
}

DyeComparerTest.test(
  Foba.flop({ size: 9 }),
  Object.values(Presets) |> flop
)
