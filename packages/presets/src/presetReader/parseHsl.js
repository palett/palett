import { hexToHsl } from '@palett/convert'
import { STR }      from '@typen/enum-data-types'

export const parseHsl = color => typeof color === STR ? color |> hexToHsl : color
