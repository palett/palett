import { normal } from './resources/nord'
import { TableX } from 'xbrief'
import { Samples } from 'veho'
import { Hatsu } from '@palett/hatsu'
import { HexToRgb, Hsl } from '..'

export class FarbeTest {
  static cycleTransform () {
    'Testing hex -> rgb -> hsl -> rgb -> hex' |> console.log
    const samples = Object.entries(normal).map(([name, hex]) => {
      const rgb = hex |> HexToRgb.fromHex
      const hsl = rgb |> HexToRgb.toHsl
      const rgb2 = hsl |> Hsl.toRgb
      const hex2 = rgb2 |> HexToRgb.toHex
      return {
        name: name |> Hatsu.hex(hex),
        hex: hex |> Hatsu.hex(hex).inverse,
        rgb: rgb,
        hsl: hsl,
        rgb2: rgb2,
        hex2: rgb2 |> HexToRgb.toHex |> Hatsu.hex(hex2).inverse
      }
    })
    samples |> Samples.toTable |> TableX.brief |> console.log
  }
}

FarbeTest.cycleTransform()

