import { BOLD }             from '@palett/enum-font-effects'
import { FRESH, PLANET }    from '@palett/presets'
import { deco }             from '@spare/deco'
import { logger }           from '@spare/logger'
import { PresetCollection } from '../src/PresetCollection'

const conf = PresetCollection.build(FRESH)

conf |> deco |> logger

// conf.assignPresets() |> JSON.stringify |> logger
conf.assignPresets(FRESH, PLANET) |> deco |> logger

conf.assignEffect(BOLD) |> deco |> logger

conf.setBound(false) |> deco |> logger