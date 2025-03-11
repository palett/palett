import { init }         from '@vect/vector-init'
import { test }         from 'node:test'
import { shiftFlopper } from '../src/utils/shiftFlopper.js'

test('shiftFlopper', () => {
  const vec = init(24, i => i)
  console.log([ ...shiftFlopper(vec, 1) ])
  console.log([ ...shiftFlopper(vec, 4) ])
})