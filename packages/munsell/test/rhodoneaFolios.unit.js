import { Fluo }               from '@palett/fluo'
import { hexToStr }           from '@palett/stringify'
import { DecoVector, logger } from '@spare/logger'
import { rhodoneaFolios }     from '../src/rhodoneaFolios.js'
import { HSL }                from '../src/HSL.js'

// '#AE5459': 'Mineral Red',
const hsl = HSL.fromHex('#AE5459')

const list = rhodoneaFolios(
  hsl,
  {
    petals: 5,
    density: 0.01
  })

logger(DecoVector({ read: ([ hex, name ]) => hexToStr(hex) + ' > ' + Fluo.hex(name, hex) })(list))