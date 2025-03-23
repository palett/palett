import { demoTapeHSL } from '@palett/pres'
import { test }        from 'node:test'
import { presFlopper } from '../src/index.js'


test('presFlopper', () => {
  const flopper = presFlopper(false)
  for (let i = 0; i < 256; i++) {
    const pres = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, pres.name, demoTapeHSL.call(pres, 7))
  }
})