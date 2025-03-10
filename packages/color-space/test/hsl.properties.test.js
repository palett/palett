import { test } from 'node:test'
import { HSL }  from '../src/HSL.js'

test('hsl properties', () => {
  const hsl = HSL.fromRgb([ 92, 92, 255 ])
  console.log(`[h] (${hsl.h}) [s] (${hsl.s}) [l] (${hsl.l})`)
})
