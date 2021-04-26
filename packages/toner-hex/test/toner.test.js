import { hexToRgb }      from '@palett/convert'
import { Dye }           from '@palett/dye'
import { palettFlopper } from '@palett/flopper'
import { deco, says }    from '@spare/logger'
import { toner }         from '../src/toner'

const flopper = palettFlopper()

for (let i = 0; i < 10; i++) {
  let { hue, degree, color } = flopper.next().value;
  ({
    color: color |> Dye(color |> hexToRgb),
    toned: (color = toner(color, -30, 6, 12))|> Dye(color |> hexToRgb)
  })
    |> deco
    |> says[i].br(hue + ' ' + degree)
}

