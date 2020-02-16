import { Hatsu } from '@palett/hatsu'
import { ArrX } from 'xbrief'
import { normal } from './resources/nord'
import { Rgb, Hsl } from '@palett/convert'
import { trimColor } from 'spettro/testBind/util/colorValueHelper'

const len = ArrX.maxLength(Object.keys(normal))

export class RgbTransHslTest {
  static testRgbToHsl () {
    for (let [name, { hex, rgb, hsl }] of Object.entries(normal)) {
      // const [r] = rgb
      // if (Math.max(...rgb) !== r) continue
      `${Hatsu.hex(hex).underline(name.padStart(len))}`
        .tag('rgb').tag(rgb)
        .tag('hsl0').tag(hsl)
        .tag('hsl').tag(rgb |> Rgb.toHsl |> trimColor)
        |> console.log
    }
  }

  static testHslToRgb () {
    for (let [name, { hex, rgb, hsl }] of Object.entries(normal)) {
      `${Hatsu.hex(hex).underline(name.padStart(len))}`
        .tag('hsl').tag(hsl)
        .tag('rgb0').tag(rgb)
        .tag('rgb').tag(hsl |> Hsl.toRgb |> trimColor) |> console.log
    }

  }
}

