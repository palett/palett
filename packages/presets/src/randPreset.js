import { randBetw }           from '@aryth/rand'
import { hexToHsl, hslToHex } from '@palett/convert'
import { toner }              from '@palett/toner-hsl'

const reverseHue = (hue) => {
  hue += 180
  return hue > 360 ? hue - 360 : hue < 0 ? hue + 360 : hue
}

const constraint = (x, min, max) => x > max ? max : x < min ? min : x

export const randPreset = (hex) => {
  const min = hex
  const hsl = min |> hexToHsl
  const max = toner(hsl.slice(), randBetw(-12, 12), randBetw(-5, 10), randBetw(6, 18)) |> hslToHex
  const na = [reverseHue(hsl[0]), constraint(hsl[1] - 32, 5, 90), constraint(hsl[2] + 24, 40, 96)] |> hslToHex
  return { min, max, na }
}
