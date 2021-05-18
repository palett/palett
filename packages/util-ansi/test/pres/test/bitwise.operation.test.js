import { logger, xr } from '@spare/logger'

{
  const candidates = [
    0,
    31,
    255,
    511,
    513,
  ]

  const NAC = 0x1ff

  for (let n of candidates) {
    xr().p(String(n).padStart(3)).and(n & NAC).and(n & ~NAC).or(n | NAC).or(n | ~NAC).xor(~n) |> logger
  }
}

{
  const entries = [
    [ 0b0001, 0b0101 ],
    [ 0b0101, 0b0101 ]
  ]

  for (let [ a, b ] of entries) {
    xr().a(a).b(b).bit_and((a & b).toString(2)).bit_or((a | b).toString(2)) |> logger
  }
}

