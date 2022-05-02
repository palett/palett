import { hexToRgb }      from '@palett/convert'
import { PrepDye }       from '@palett/dye'
import { BOLD }          from '@palett/enum-font-effects'
import { deca, logger }  from '@spare/logger'
import { presetFlopper } from '../src/presetFlopperMaterial'

const prepDye = PrepDye(BOLD)
const flopper = presetFlopper()
for (let i = 0; i < 32; i++) {
  const { value: { min, max, na } } = flopper.next();
  ({
    min: min |> prepDye(min|> hexToRgb),
    max: max |> prepDye(max |> hexToRgb),
    na: na |> prepDye(na |> hexToRgb)
  }) |> deca({ wo: 128 }) |> logger
}

// [...flp] |> deca({ wo: 128 }) |> narrate
// for (let o of flp) { o |> delogger }

