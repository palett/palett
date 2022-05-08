import { says }    from '@spare/xr'
import { indexed } from '@vect/object-mapper'
import { Preset }  from '../src/Preset'

export const presets = {
  a: Preset.build('#E2A829', '#C5D51D')
}

for (let [ name, preset ] of indexed(presets)) {
  preset.demo(6) |> says[name]
}