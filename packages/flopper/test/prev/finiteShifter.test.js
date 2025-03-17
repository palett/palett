import { init }          from '@vect/vector-init'
import { test }          from 'node:test'
import { finiteShifter } from '../src/util/finiteShifter.js'

test('shiftFlopper', () => {
  const vec = init(24, i => i)
  console.log([ ...finiteShifter(vec, 1) ])
  console.log([ ...finiteShifter(vec, 4) ])
})