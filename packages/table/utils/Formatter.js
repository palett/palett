import { round }               from '@aryth/math'
import { hexToRgb, hslToRgb }  from '@palett/convert'
import { DyeFactory, PrepDye } from '@palett/dye'
import { HEX, HSL, RGB }       from '@palett/enum-color-space'
import { INVERSE }             from '@palett/enum-font-effects'
import { mapper }              from '@vect/vector-mapper'

export const Formatter = (space, color = false) => {
  const dyeFactory = DyeFactory.build(space, [INVERSE])
  if (space === RGB || space === HSL) {
    const formatter = color => mapper(color, x => round(x).toString().padStart(3))
    return color
      ? color => color|> formatter |> dyeFactory(color)
      : formatter
  }
  if (space === HEX)
    return color ? hex => hex |> dyeFactory(hex) : hex => hex
}

export function SelectDye(space) {
  const dyeFactory = DyeFactory.build(space, [INVERSE])
  const prepDye = PrepDye(INVERSE)
  if (space === RGB) return prepDye
  if (space === HSL) return hsl => prepDye(hsl |> hslToRgb)
  if (space === HEX) return hex => prepDye(hex|> hexToRgb)
  return prepDye
}
