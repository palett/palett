import { hexToRgb }       from '@palett/convert'
import { Dye }            from '@palett/dye'
import { palettFlopper }  from '@palett/flopper'
import { decoPale, says } from '@spare/logger'
import { toneHex }        from '../index.js'

const flopper = palettFlopper()

for (let i = 0; i < 10; i++) {
  let { hue, degree, color } = flopper.next().value
  const colorBeta = toneHex(color, -30, 6, 12)
  says[i].br(hue + ' ' + degree)(decoPale(({
    hex: color,
    rgb: hexToRgb(color),
    color: fluo(hexToRgb(color))(color),
    toned: Dye.rgb(hexToRgb(colorBeta))((colorBeta))
  })))
}

