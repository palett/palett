import { hexToHsl, hexToRgb } from '@palett/convert'
import { HEX, HSL, RGB }      from '@palett/enum-color-space'

export const ColorPicker = colorSpace => {
  if (colorSpace === RGB) return x => x |> hexToRgb
  if (colorSpace === HSL) return x => x |> hexToHsl
  if (colorSpace === HEX) return x => x
}
