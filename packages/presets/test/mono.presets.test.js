import { logger }  from '@spare/logger'
import { indexed } from '@vect/object-mapper'
import { demo }    from '../src/demo.js'
import { Preset }  from '../src/Preset'

const presetCollection = {
  bleu: Preset.build('#2E4DA7', '#9299ff'),
  magenta: Preset.build('#C379E4', '#C6B0D5'),
  green: Preset.build('#22F0CC', '#DFEF87')
}

const LEN = 9
for (let [ key, preset ] of indexed(presetCollection)) {
  `>> ${key.padStart(7)} ${demo(preset, LEN)}` |> logger
}
