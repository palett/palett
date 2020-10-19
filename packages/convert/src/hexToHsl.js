import { hexToRgb } from './hexToRgb'
import { rgbToHsl } from './rgbToHsl'

export const hexToHsl = hex => hex |> hexToRgb |> rgbToHsl
