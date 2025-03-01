import { test } from 'node:test'
import { fluo } from '../index.js'

test('fluo', () => {
  console.log(fluo('some', [ 127, 127, 127 ]))
// Fluo.hex('BlueGrey.accent_2', BlueGrey.accent_2) |> console.log
// Fluo.rgb('Purple.lighten_3', Purple.lighten_3 |> hexToRgb) |> console.log
// Fluo.int('LightGreen.accent_3', LightGreen.accent_3 |> hexToInt) |> console.log
// Fluo.hsl('Brown.base', Brown.base |> hexToHsl) |> console.log
})

