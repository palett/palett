import { hexToRgb }      from '@palett/convert'
import { PrepDye }       from '@palett/dye'
import { BOLD }          from '@palett/enum-font-effects'
import { deca, logger }  from '@spare/logger'
import { palettFlopper } from '../src/palettFlopper'

const prepDye = PrepDye(BOLD)
const flopper = palettFlopper()
for (let i = 0; i < 32; i++) {
  const { value: { hue, degree, color } } = flopper.next();
  ({ hue, degree, color: color |> prepDye(color|> hexToRgb) }) |> deca({ wo: 128 }) |> logger
}

// [...flp] |> deca({ wo: 128 }) |> narrate
// for (let o of flp) { o |> delogger }

