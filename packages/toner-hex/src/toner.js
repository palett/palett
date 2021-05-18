import { constraint }         from '@aryth/math'
import { hexToHsl, hslToHex } from '@palett/convert'

export const toner = (hex, dh, ds, dl) => {
  let hsl = hex |> hexToHsl
  hsl[0] = constraint(hsl[0] + dh, 0, 360)
  hsl[1] = constraint(hsl[1] + ds, 0, 100)
  hsl[2] = constraint(hsl[2] + dl, 0, 100)
  return hsl |> hslToHex
}
