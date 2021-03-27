import { ATLAS }           from '@palett/presets'
import { ProjectorConfig } from '../index'

const params = {
  bound: { min: 0, max: 5 },
  preset: ATLAS,
  effects: []
}

ProjectorConfig.build(params.bound, params.preset, params.effects)
  |> JSON.stringify
  |> console.log