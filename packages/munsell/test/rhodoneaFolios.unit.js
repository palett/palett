import { hexToHsi, hexToHsl } from '@palett/convert'
import { dhex }               from '@palett/dye'
import { hexToStr, hslToStr } from '@palett/stringify'
import { logger }             from '@spare/logger'
import { MIDTONE }            from '../resources/MIDTONE.js'
import { Munsell }            from '../src/Munsell.js'
import { rhodonea }           from '../src/rhodonea.js'
// '#AE5459': 'Mineral Red',
// '#C9D77E': 'Daiquiri Green',

// test('rhodonea unit', () => {
const Midtone = Munsell.build(MIDTONE)
const hex = '#8FB68F'
// const hsl = HSL.fromHex('#AE5459')
const conf = {
  petals: 5,
  density: 0.01,
  minL: 45,
  munsell: Midtone,
}
const result = rhodonea.call(conf, hexToHsi(hex))
// console.log('result', result)

const rendered = result.map(
  ([ hex, name ]) => hexToStr(hex) + ' > ' + hslToStr(hexToHsl(hex)) + ' > ' + dhex.call(hex, name),
)
logger('rendered')
logger(rendered.join('\n'))
// })