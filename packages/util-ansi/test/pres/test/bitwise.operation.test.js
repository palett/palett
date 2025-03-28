import { logger, xr } from '@spare/logger'

{
  const candidates = [
    -2,
    -1,
    0,
    1,
    2,
    31,
    255,
    511,
    512,
    513,
  ]

  const NAC = 0x1ff

  for (let n of candidates) {
    xr().p(String(n).padStart(3)).and(n & NAC).neg_and(n & ~NAC).or(n | NAC).neg_or(n | ~NAC).xor(~n) |> logger
  }
}

{
  const entries = [
    [ 0b0001, 0b0101 ],
    [ 0b0101, 0b0101 ],
  ]

  for (let [ a, b ] of entries) {
    xr().a(a).b(b).bit_and((a & b).toString(2)).bit_or((a | b).toString(2)) |> logger
  }
}

