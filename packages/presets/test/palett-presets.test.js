import { Presets } from '../index'
import { Ob } from 'veho'
import { logger, logNeL } from '@spare/logger'
import { deco } from '@spare/deco'
import { xr } from '@spare/xr'
import { hexToHsl, hexToRgb, hslToHex, hslToRgb } from '@palett/convert'
import { mapper as columnsMapper } from '@vect/columns-mapper'
import { transpose } from '@vect/matrix-transpose'
import { almostEquals, round } from 'aryth'
import { Dye } from '@palett/dye'

const range = (min, max, len) => {
  let delta = (max - min) / (len - 1)
  const ar = Array(len)
  if (almostEquals(delta, 0, 0.0008)) delta = 0
  for (let i = 0; i < len; i++) ar[i] = min + i * delta
  return ar
}

const formatHsl = ([h, s, l]) => `${round(h)}-${round(s)}-${round(l)}`
for (let theme in Presets) {
  const effects = Ob.mapValues(Presets[theme], hex => hex|> hexToHsl |> formatHsl |> Dye(hex |> hexToRgb))
  const { max, min } = Presets[theme]
  xr(theme, effects |> deco) |> logger
  const ranges = columnsMapper(
    [min |> hexToHsl, max |> hexToHsl],
    ([min, max]) => range(min, max, 7)
  ) |> transpose
  ranges.unshift(Presets[theme].na |> hexToHsl)
  ranges.map((hsl, i) => hsl |> hslToHex |> Dye(hsl |> hslToRgb)) |> logNeL
}
