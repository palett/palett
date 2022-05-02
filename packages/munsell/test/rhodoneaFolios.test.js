import { Fluo }               from '@palett/fluo'
import { hexToStr }           from '@palett/stringify'
import { DecoVector, logger } from '@spare/logger'
import { hexToRgb }           from '../src/convert'
import { rhodoneaFolios }     from '../src/rhodoneaFolios'

// '#AE5459': 'Mineral Red',
const hsl = hexToRgb('#AE5459').toHsl()

const list = rhodoneaFolios(
  hsl,
  {
    petals: 5,
    density: 0.01
  })

list |> DecoVector({ read: ([ hex, name ]) => hexToStr(hex) + ' > ' + Fluo.hex(name, hex) }) |> logger