import { hexToRgb, hslToRgb} from '@palett/convert'
import { HEX, HSL, RGB } from '@palett/enum-color-space'
import { INVERSE } from '@palett/enum-font-effects'
import { mapper} from '@vect/vector-mapper'
import { round } from '@aryth/math'
import { PrepDye } from '@palett/dye'

export const Formatter = (space, color = false) => {
  const Dye = SelectDye(space)
  if (space === RGB || space === HSL) {
    const formatter = rgb => mapper(rgb, x => String(round(x)).padStart(3))
    return color
      ? rgb => rgb|> formatter |> Dye(rgb)
      : formatter
  }
  if (space === HEX)
    return color
      ? hex => hex |> Dye(hex)
      : hex => hex
}

export function SelectDye (space) {
  const prepDye = PrepDye(INVERSE)
  if (space === RGB) return prepDye
  if (space === HSL) return hsl => prepDye(hsl |> hslToRgb)
  if (space === HEX) return hex => prepDye(hex|> hexToRgb)
}
