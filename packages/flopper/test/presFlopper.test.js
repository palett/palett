import { demo }        from '@palett/pres'
import { test }        from 'node:test'
import { presFlopper } from '../src/presFlopper.js'

test('presFlopper', () => {
  const flopper = presFlopper(false)
  for (let i = 0; i < 256; i++) {
    const preset = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, preset.name, demo(preset, 7))
  }
})