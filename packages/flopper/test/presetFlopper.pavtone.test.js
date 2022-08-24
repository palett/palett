import { demo }                 from '@palett/presets'
import { presetFlopperPavtone } from '../src/presetFlopperPavtone'

// const flopper = presetFlopperPavtone()
// for (let preset of flopper) {
//   console.log(preset.name, decoPreset(preset))
// }

const flopper = presetFlopperPavtone(false)
for (let i = 0; i < 1000; i++) {
  const preset = flopper.next().value
  console.log(i, preset.name, demo(preset, 7))
}