import { demo }        from '@palett/pres'
import { test }        from 'node:test'
import { presShifter } from '../src/presShifter.js'

test('presShifter', () => {
  const flopper = presShifter(false)
  for (let i = 0; i < 128; i++) {
    const preset = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, preset.name, demo(preset, 7))
  }
})