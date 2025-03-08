import { $, logger } from '@spare/logger'
import { test }      from 'node:test'

const vec = [
  -512,
  -511,
  -510,
  -256,
  -255,
  -127,
  -1,
  0,
  1,
  127,
  255,
  256,
  510,
  511,
  512
]

test('bitwise operator', () => {
  for (let n of vec) {
    // logger($['n'](n)['n & 0xFF'](n & 0xFF)['~(n >> 31)'](~(n >> 31))['(n & ~(n >> 31))&0xFF']((n & ~(n >> 31)) & 0xFF))
    logger($['n'](n)['n & 0xFF'](n & 0xFF))
  }
})