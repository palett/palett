import { demo }        from '@palett/presets'
import { test }        from 'node:test'
import { presShifter } from '../src/presShifter.js'

// const flopper = presetFlopperPavtone()
// for (let preset of flopper) {
//   console.log(preset.name, decoPreset(preset))
// }

test('presShifter', () => {
  const flopper = presShifter(false)
  for (let i = 0; i < 2000; i++) {
    const preset = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, preset.name, demo(preset, 7))
  }
})