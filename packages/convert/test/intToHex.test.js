import { logger, xr } from '@spare/logger'
import { rgbToInt }   from '../dist/index.esm'

const candidates = [
  [ 0, 0, 0 ]|> rgbToInt,
  [ 0, 0, 1 ]|> rgbToInt,
  [ 0, 1, 0 ]|> rgbToInt,
  [ 1, 0, 0 ]|> rgbToInt,
  [ 0, 0, 255 ]|> rgbToInt,
  [ 0, 255, 0 ]|> rgbToInt,
  [ 255, 0, 0 ]|> rgbToInt,
  [ 255, 255, 255 ]|> rgbToInt,
  [ 51, 255, 0 ] |>  rgbToInt,
]

for (let n of candidates) {
  xr().number(n).toHex(n.toString(16)) |> logger
}