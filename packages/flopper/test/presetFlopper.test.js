import { hexToRgb }      from '@palett/convert'
import { PrepDye }       from '@palett/dye'
import { BOLD }          from '@palett/enum-font-effects'
import { deca, logger }  from '@spare/logger'
import { presetFlopper } from '../src/presetFlopper'

const prepDye = PrepDye(BOLD)
const flopper = presetFlopper()
for (let i = 0; i < 32; i++) {
  const { value: { hue, degree, color } } = flopper.next();
  ({ hue, degree, color: color |> prepDye(color|> hexToRgb) }) |> deca({ wo: 128 }) |> logger
}

// [...flp] |> deca({ wo: 128 }) |> narrate
// for (let o of flp) { o |> delogger }

