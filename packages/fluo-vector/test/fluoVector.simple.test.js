import { RENDER }           from '@palett/enum-colorant-modes'
import { BOLD, ITALIC }     from '@palett/enum-font-effects'
import { PresetCollection } from '@palett/fluo'
import { FRESH }            from '@palett/presets'
import { logger }           from '@spare/logger'
import { fluoVector }       from '../src/fluoVector'

const vector = ['1', 'a']

fluoVector.call(
  RENDER,
  vector,
  PresetCollection.build(FRESH).assignEffect(BOLD, ITALIC)
)
  |> logger