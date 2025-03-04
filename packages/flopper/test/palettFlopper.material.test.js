import { demo }                  from '@palett/presets'
import { test }                  from 'node:test'
import { presetFlopperMaterial } from '../index.js'

test('presetFlopper pavtone', () => {
  const flopper = presetFlopperMaterial()
  for (let i = 0; i < 1000; i++) {
    const preset = flopper.next().value
    console.log(i, preset.name, demo(preset, 7))
  }
})

// [...flp] |> deca({ wo: 128 }) |> narrate
// for (let o of flp) { o |> delogger }

