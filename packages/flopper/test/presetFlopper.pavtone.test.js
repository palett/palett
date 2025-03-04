import { demo,Preset }                 from '@palett/presets'
import { test }                 from 'node:test'
import { presetFlopperPavtone } from '../src/presetFlopperPavtone.js'

// const flopper = presetFlopperPavtone()
// for (let preset of flopper) {
//   console.log(preset.name, decoPreset(preset))
// }

test('presetFlopper pavtone', () => {
  const flopper = presetFlopperPavtone(false)
  for (let i = 0; i < 1000; i++) {
    const preset = flopper.next().value
    // console.log(preset, preset instanceof Preset)
    console.log(i, preset.name, demo(preset, 7))
  }
})