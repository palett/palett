import { demo }  from '@palett/pres'
import { METRO } from '@palett/presets'
import { test }  from 'node:test'
import { Proj }  from '../src/Proj.js'

const proj = Proj.from({ lo: 0, hi: 100 }, METRO)

console.log(demo(METRO, 5))

test('proj simple', () => {
  console.log(proj.render(NaN, 'nan'))
  console.log(proj.render(0, 'zero'))
  console.log(proj.render(20, 'twenty'))
  console.log(proj.render(40, 'forty'))
  console.log(proj.render(60, 'sixty'))
  console.log(proj.render(80, 'eighty'))
  console.log(proj.render(100, 'hundred'))
})
