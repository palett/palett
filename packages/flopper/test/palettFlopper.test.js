import { palettFlopper } from '../src/palettFlopper'
import { PrepDye } from '@palett/dye'
import { BOLD } from '@palett/enum-font-effects'
import { hexToRgb } from '@palett/convert'
import { deca, delogger, logger } from '@spare/logger'

const prepDye = PrepDye(BOLD)
const flp = palettFlopper()
for (let i = 0; i < 32; i++) {
  const { value: { hue, degree, color } } = flp.next();
  ({ hue, degree, color: color|> prepDye(color|> hexToRgb) }) |> deca({ wo: 128 }) |> logger
}

[...flp] |> deca({ wo: 128 }) |> logger
for (let o of flp) {
  o |> delogger
}

