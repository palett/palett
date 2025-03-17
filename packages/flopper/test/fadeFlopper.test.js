import { MIDTONE }     from '@palett/nuance-midtone'
import { demoTapeHSL } from '@palett/pres'
import { test }        from 'node:test'
import { fadeFlopper } from '../src/fadeFlopper.js'

test('fadeFlopper', () => {
  const flopper = fadeFlopper.call(MIDTONE, 24)
  for (let i = 0; i < 24; i++) {
    const pres = flopper.next().value
    // console.log(pres, pres instanceof Pres)
    if (pres) {
      console.log(i, pres.name, demoTapeHSL.call(pres, 7))
    } else {
      console.log(i, pres)
    }

  }
})