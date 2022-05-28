import { RENDER }           from '@palett/enum-colorant-modes'
import { BOLD, ITALIC }     from '@palett/enum-font-effects'
import { PresetCollection } from '@palett/fluo'
import { FRESH }            from '@palett/presets'
import { logger }           from '@spare/logger'
import { fluoVector }       from '../src/fluoVector'
import { candidates }       from './strategies/candidates'

for (let [k, vector] of Object.entries(candidates)) {
  fluoVector.call(
    {
      mutate: false,
      colorant: RENDER
    },
    vector,
    PresetCollection.build(FRESH).assignEffect(BOLD, ITALIC)
    // [
    //   { preset: FRESH, by: isNumeric, to: x => x },
    //   { preset: PLANET, by: isLiteral, to: stringValue }
    // ]
  )
    |> logger
  // |> says[k]
}
