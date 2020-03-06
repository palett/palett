import { hexToHsl, hexToRgb, rgbToHex } from '@palett/convert'
import { Hatsu } from '@palett/hatsu'
import { mapper } from '@vect/vector-mapper'
import { HEX, HSL, RGB } from '@palett/enum-color-space'
import { round } from '@aryth/math'

export const ColorPick = colorSpace => {
  switch (colorSpace) {
    case RGB:
      return x => x |> hexToRgb
    case HSL:
      return x => x |> hexToHsl
    case HEX:
    default:
      return x => x
  }
}

export function toStatistic (space, cellColor = false) {
  switch (space) {
    case RGB:
    case HSL:
      return arr => {
        let [a, b, c] = [0, 0, 0], l = arr.length
        mapper(arr, ([x, y, z]) => [a, b, c] = [a + x, b + y, c + z], l)
        return [round(a / l), round(b / l), round(c / l)]
      }
    case HEX:
      return arr => arr.map(hexToRgb) |> toStatistic(RGB) |> rgbToHex
    default:
      return x => x
  }
}

export const Formatter = (space, color = false) => {
  let formatter = space === RGB || space === HSL
    ? vec => vec.map(x => String(round(x)).padStart(3))
    : null
  let hatsu = color
    ? space |> toHatsu
    : null
  return formatter
    ? hatsu
      ? x => x|> formatter |> (x |> hatsu)
      : formatter
    : hatsu
      ? x => x |> (x |> hatsu)
      : x => x
}

export function toHatsu (space) {
  switch (space) {
    case RGB:
      return rgb => Hatsu.rgb(rgb).inverse
    case HSL:
      return hsl => Hatsu.hsl(hsl).inverse
    case HEX:
      return hex => Hatsu.hex(hex).inverse
    default:
      return null
  }
}
