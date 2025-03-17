import { hexToHsi }    from '@palett/convert'
import { Munsell }     from '@palett/munsell'
import { MIDTONE }     from '@palett/nuance-midtone'
import { demoTapeHSL } from '@palett/pres'
import { logger }      from '@spare/logger'
import { test }        from 'node:test'
import { rhodFlopper } from '../src/rhodFlopper.js'
// '#AE5459': 'Mineral Red',
// '#C9D77E': 'Daiquiri Green',

// test('rhodonea unit', () => {
const munsell = Munsell.build(MIDTONE)
const hex = '#9479AF' // '#58C9D4' // '#D99938' // '#EA6B6A' // '#8FB68F'
// const hsl = HSL.fromHex('#AE5459')
const conf = {
  // seed: hexToHsi(hex),
  petals: 3,
  density: 0.1,
  minL: 45,
  munsell: munsell,
}

test('rhodFlopper test', () => {
  console.time('rhodonea')
  const generator = rhodFlopper.call(conf, false)
  console.timeEnd('rhodonea')
  // console.log('result', result)
  for (let i = 0; i < 36; i++) {
    const { value: pres, done } = generator.next()
    if (done) break
    console.log(demoTapeHSL.call(pres, 6))
    // const hex = hsiToHex(value)
    // const name = munsell.name(value)
    // console.log(hexToStr(hex) + ' > ' + hslToStr(hexToHsl(hex)) + ' > ' + dhex.call(hex, name))
  }
  logger('rendered')

})