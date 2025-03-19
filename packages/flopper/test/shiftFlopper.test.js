import { demoTapeHSL } from '@palett/pres'
import { test }         from 'node:test'
import { shiftFlopper } from '../src/index.js'

test('presShifter', () => {
  const flopper = shiftFlopper(false)
  for (let i = 0; i < 128; i++) {
    const pres = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, pres.name, demoTapeHSL.call(pres, 7))
  }
})