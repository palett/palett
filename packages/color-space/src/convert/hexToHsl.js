import { hexToInt } from '@palett/convert'
import { intToHsl } from './intToHsl'

export const hexToHsl = hex => hex |> hexToInt |> intToHsl
