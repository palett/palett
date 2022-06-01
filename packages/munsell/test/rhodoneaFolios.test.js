import { Fluo }               from '@palett/fluo'
import { hexToStr }           from '@palett/stringify'
import { DecoVector, logger } from '@spare/logger'
import { rhodoneaFolios }     from '../src/rhodoneaFolios'
import { HSL }                from '../src/HSL'

// '#AE5459': 'Mineral Red',
const hsl = HSL.fromHex('#AE5459')

const list = rhodoneaFolios(
  hsl,
  {
    petals: 5,
    density: 0.01
  })

list |> DecoVector({ read: ([hex, name]) => hexToStr(hex) + ' > ' + Fluo.hex(name, hex) }) |> logger