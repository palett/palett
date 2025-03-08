import { METRO }   from '@palett/presets/static/material.js'
import { PAGODA }  from '@palett/presets/static/pavtone.js'
import { indexed } from '@vect/object-mapper'

import { Pres } from '../src/Pres.js'
import { demo } from '../src/preset-utils.js'

export const presets = {
  a: Pres.build('#E2A829', '#C5D51D'),
  b: PAGODA,
  c: METRO,
}

for (let [ name, preset ] of indexed(presets)) {
  console.log(preset)
  console.log(demo(preset, 6))
  console.log(preset.toRgb())
}