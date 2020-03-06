import { hexToHsl, hexToRgb, rgbToHex } from '@palett/convert'
import { Zu } from 'borel'
import { Hatsu } from '@palett/hatsu'
import { Ar } from 'veho'
import { HEX, HSL, RGB } from '@palett/enum-color-space'

export const toDataPicker = colorSpace => {
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
        let [a, b, c] = [0, 0, 0], len = arr.length
        Ar.map(arr, ([x, y, z]) => [a, b, c] = [a + x, b + y, c + z], len)
        return [Zu.round(a / len), Zu.round(b / len), Zu.round(c / len)]
      }
    case HEX:
      return arr => arr.map(hexToRgb) |> toStatistic(RGB) |> rgbToHex
    default:
      return x => x
  }
}

export const toFormatter = (space, colorify = false) => {
  let formatter = space === RGB || space === HSL
    ? vec => vec.map(x => String(Zu.round(x)).padStart(3))
    : null
  let hatsu = colorify
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
