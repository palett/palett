import { logger }  from '@spare/logger'
import { indexed } from '@vect/object-mapper'
import { test }    from 'node:test'
import { demo }    from '../src/demo.js'
import { Pres }    from '../src/Pres.js'

const presetCollection = {
  bleu: Pres.build('#2E4DA7', '#9299ff'),
  magenta: Pres.build('#C379E4', '#C6B0D5'),
  green: Pres.build('#22F0CC', '#DFEF87')
}

test('mono presets', () => {
  const LEN = 9
  for (let [ key, preset ] of indexed(presetCollection)) {
    logger(`>> ${key.padStart(7)} ${demo(preset, LEN)}`)
  }
})