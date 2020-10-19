import { hslToRgb } from './hslToRgb'
import { rgbToHex } from './rgbToHex'

export const hslToHex = hsl => hsl |> hslToRgb |> rgbToHex
