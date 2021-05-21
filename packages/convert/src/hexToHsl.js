import { hexToInt } from './hexToInt'
import { intToHsl } from './intToHsl'

export const hexToHsl = hex => hex |> hexToInt |> intToHsl
