import { BOLD }                 from '@palett/enum-font-effects'
import { ATLAS, FRESH, PLANET } from '@palett/presets'
import { deco }                 from '@spare/deco'
import { logger }               from '@spare/logger'
import { PresetCollection }     from '../src/PresetCollection.js'

const presets = PresetCollection.build(ATLAS)

presets |> JSON.stringify |> logger

presets.assignPresets(FRESH, PLANET) |> JSON.stringify |> logger

presets.assignEffect(BOLD) |> JSON.stringify |> logger

presets.setBound(false) |> deco |> logger
