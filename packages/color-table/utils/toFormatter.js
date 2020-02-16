import { hexToHsl, hexToRgb, rgbToHex } from '@palett/convert'
import { Zu } from 'borel'
import { Hatsu } from '@palett/hatsu'
import { Ar } from 'veho'

export const toDataPicker = (space) => {
  switch (space) {
    case 'rgb':
      return x => x |> hexToRgb
    case 'hsl':
      return x => x |> hexToHsl
    case 'hex':
    default:
      return x => x
  }
}

export function toStatistic (space, cellColor = false) {
  switch (space) {
    case 'rgb':
    case 'hsl':
      return arr => {
        let [a, b, c] = [0, 0, 0], len = arr.length
        Ar.map(arr, ([x, y, z]) => [a, b, c] = [a + x, b + y, c + z], len)
        return [Zu.round(a / len), Zu.round(b / len), Zu.round(c / len)]
      }
    case 'hex':
      return arr => arr.map(hexToRgb) |> toStatistic('rgb') |> rgbToHex
    default:
      return x => x
  }
}

export const toFormatter = (space, colorify = false) => {
  let formatter = space === 'rgb' || space === 'hsl'
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
    case 'rgb':
      return rgb => Hatsu.rgb(rgb).inverse
    case 'hsl':
      return hsl => Hatsu.hsl(hsl).inverse
    case 'hex':
      return hex => Hatsu.hex(hex).inverse
    default:
      return null
  }
}
