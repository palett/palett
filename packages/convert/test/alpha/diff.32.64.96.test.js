import { logger }                 from '@spare/logger'
import { xr }                     from '@spare/xr'
import { AND, NOT, OR, SHR, XOR } from './constants'

const candidates = [
  0,
  16,
  31,
  32,
  48,
  63,
  64,
  72,
  95,
  96,
  108,
]
const N = 32
for (let n of candidates) {
  xr()
    .value(n)
    [AND + N](n & N)
    [OR + N](n | N)
    [NOT + N](~n)
    [XOR + N](n ^ N)
    [SHR + N](n >> 5) // / 32
    [AND + 0xf](n & 0xf) // / 32
    |> logger
}