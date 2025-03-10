import { hexToHsl }           from '@palett/convert'
import { dhex }               from '@palett/dye'
import { hexToStr, hslToStr } from '@palett/stringify'
import { logger }         from '@spare/logger'
import { HSL }            from '../src/extends/HSL.js'
import { rhodoneaFolios } from '../src/rhodoneaFolios.js'

// '#AE5459': 'Mineral Red',
// '#C9D77E': 'Daiquiri Green',

const hsl = HSL.fromHex('#C9D77E')

const list = rhodoneaFolios(hsl, {
  petals: 5,
  density: 0.01,
  lightMinimum: 54
})

const rendered = list.map(([ hex, name ]) => hexToStr(hex) + ' > ' + hslToStr(hexToHsl(hex)) + ' > ' + dhex.call(hex, name))
logger('rendered')
logger(rendered.join('\n'))