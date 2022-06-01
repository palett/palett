import { hexToHsl, hexToRgb, hslToHex, hslToRgb } from '@palett/convert'
import { Dye }                                    from '@palett/dye'
import { palettFlopper }                          from '@palett/flopper'
import { says }                                   from '@palett/says'
import { deco }                                   from '@spare/deco'
import { logger }                                 from '@spare/logger'
import { toner }                                  from '../src/toner'

const flopper = palettFlopper()

for (let i = 0; i < 10; i++) {
  let { hue, degree, color } = flopper.next().value;
  ({
    color: color |> Dye(color |> hexToRgb),
    toned: (color = toner((color |> hexToHsl), -30, 6, 12) |> hslToHex) |> Dye(color |> hexToRgb)
  })
    |> deco
    |> logger // says[i].br(hue + ' ' + degree)
}

