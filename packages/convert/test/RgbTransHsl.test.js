import { hexToRgb, hslToRgb, rgbToHsl } from '@palett/convert'
import { Hatsu }                        from 'archive/hatsu'
import { NORD }                         from './resources/NORD.js'

// const len = maxLen(Object.keys(normal))

export class RgbTransHslTest {
  static testRgbToHsl() {
    for (let [ name, hex ] of Object.entries(NORD)) {
      const rgb = hexToRgb(hex)
      const hsl = rgbToHsl(rgb);
      // const [r] = rgb
      // if (Math.max(...rgb) !== r) continue
      `${Hatsu.hex(hex).underline(name)}`
        .tag('rgb').tag(rgb)
        .tag('hsl0').tag(hsl)
        .tag('hsl').tag(rgb |> rgbToHsl)
        |> console.log
    }
  }

  static testHslToRgb() {
    for (let [ name, { hex, rgb, hsl } ] of Object.entries(normal)) {
      `${Hatsu.hex(hex).underline(name)}`
        .tag('hsl').tag(hsl)
        .tag('rgb0').tag(rgb)
        .tag('rgb').tag(hsl |> hslToRgb) |> console.log
    }

  }
}

RgbTransHslTest.testRgbToHsl()

