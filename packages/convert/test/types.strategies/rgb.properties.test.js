import { Deco, logger, says, Xr } from '@spare/logger'
import { mapEntries }             from '@vect/object'
import { hexToRgb }               from '../../src/hexToRgb'
import { RGB }                    from './RGB'

const candidates = {
  '#C3964D': 'Tinsel',
  '#DFDE9B': 'Citron',
  '#C0B9A4': 'Cement',
  '#834655': 'Maroon',
}

const rgbs = mapEntries(candidates, ([ hex, name ]) => [ name, hexToRgb(hex) ])

rgbs |> Deco({ vert: 1 }) |> logger

const rgb = new RGB(192, 185, 164)
const { r, g, b } = rgb
Xr().r(r).g(g).b(b) |> says['rgb']