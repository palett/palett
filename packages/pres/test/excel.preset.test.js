import { indexed } from '@vect/object-mapper'
import { METRO }   from '../static/material.js'
import { PAGODA }  from '../static/pavtone.js'
import { demo } from '../src/demo.js'
import { Pres } from '../src/Pres.js'

export const presets = {
  a: Pres.build('#E2A829', '#C5D51D'),
  b: PAGODA,
  c: METRO,
}

for (let [ name, preset ] of indexed(presets)) {
  preset |> console.log
  demo(preset, 6) |> console.log
  preset.toRgb() |> console.log
}