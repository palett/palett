import { BOLD }          from '@palett/enum-font-effects'
import { FRESH, PLANET } from '@palett/presets'
import { deco }          from '@spare/deco'
import { logger }        from '@spare/logger'
import { FluoConfigs }   from '../src/fluoConfig'

const conf = FluoConfigs.build(FRESH)

conf |> deco |> logger

// conf.assignPresets() |> JSON.stringify |> logger
conf.assignPresets(FRESH, PLANET) |> deco |> logger

conf.assignEffect(BOLD) |> deco |> logger

conf.assignBoundConfigs(false) |> deco |> logger