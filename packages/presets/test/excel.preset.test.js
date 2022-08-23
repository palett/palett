import { indexed } from '@vect/object-mapper'
import { demo }    from '../index.js'
import { METRO }   from '../resources/material.js'
import { PAGODA }  from '../resources/pavtone.js'
import { Preset }  from '../src/Preset.js'

export const presets = {
  a: Preset.build('#E2A829', '#C5D51D'),
  b: PAGODA,
  c: METRO,
}

for (let [ name, preset ] of indexed(presets)) {
  preset |> console.log
  demo(preset, 6) |> console.log
  preset.toRgb() |> console.log
}