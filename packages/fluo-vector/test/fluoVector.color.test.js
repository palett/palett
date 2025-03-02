import { FRESH }      from '@palett/presets'
import { test }       from 'node:test'
import { fluoVector } from '../index.js'
import { candidates } from './strategies/candidates.js'

test('fluoVector colors', () => {
  for (let [ k, vector ] of Object.entries(candidates)) {
    console.log(k, fluoVector(vector, FRESH).join(', '))
  }
})

