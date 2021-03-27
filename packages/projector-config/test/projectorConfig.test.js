import { BOLD }            from '@palett/enum-font-effects'
import { ATLAS }           from '@palett/presets'
import { ProjectorConfig } from '../index'

ProjectorConfig.fromHEX({ min: 0, max: 5 }, Object.assign({}, ATLAS, { effects: [BOLD] }))
  |> JSON.stringify
  |> console.log