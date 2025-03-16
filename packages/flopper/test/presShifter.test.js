import { demoTapeHSL } from '@palett/pres'
import { test }        from 'node:test'
import { presShifter } from '../src/presShifter.js'

test('presShifter', () => {
  const flopper = presShifter(false)
  for (let i = 0; i < 128; i++) {
    const pres = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, pres.name, demoTapeHSL.call(pres, 7))
  }
})