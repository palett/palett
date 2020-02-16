import { STRING } from 'typen'
import { hexToHsl } from '@palett/convert'

export const parseHsl = color => typeof color === STRING ? color |> hexToHsl : color
