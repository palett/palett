import { logger, xr } from '@spare/logger'
import { rgbToRgi }   from '../index'

const candidates = [
  [0, 0, 0]|> rgbToRgi,
  [0, 0, 1]|> rgbToRgi,
  [0, 1, 0]|> rgbToRgi,
  [1, 0, 0]|> rgbToRgi,
  [0, 0, 255]|> rgbToRgi,
  [0, 255, 0]|> rgbToRgi,
  [255, 0, 0]|> rgbToRgi,
  [255, 255, 255]|> rgbToRgi,
  [51, 255, 0] |>  rgbToRgi,
]

for (let n of candidates) {
  xr().number(n).toHex(n.toString(16)) |> logger
}