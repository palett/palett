import { test }         from 'node:test'
import { shiftFlopper } from '../src/utils/shiftFlopper.js'

test('shiftFlopper', () => {
  const vec = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
  for (const element of shiftFlopper(vec, 3)) {
    console.log(element)
  }
})