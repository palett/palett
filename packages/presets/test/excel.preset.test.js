import { indexed } from '@vect/object-mapper'
import { demo }    from '../src/demo.js'
import { Preset }  from '../src/Preset.js'
import { METRO }   from '../static/material.js'
import { PAGODA }  from '../static/pavtone.js'

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