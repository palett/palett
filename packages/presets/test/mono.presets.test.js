import { indexed } from '@vect/object-mapper'
import { logger }  from '@spare/logger'
import { Preset }  from '../src/Preset'
import { toneHex } from '@palett/color-algebra'

const presetCollection = {
  bleu: Preset.build('#2E4DA7', '#9299ff'),
  magenta: Preset.build('#C379E4', '#C6B0D5'),
  green: Preset.build('#22F0CC','#DFEF87')
}

const LEN = 9
for (let [key, preset] of indexed(presetCollection)) {
  `>> ${key.padStart(7)} ${preset.demo(LEN)}` |> logger
}
