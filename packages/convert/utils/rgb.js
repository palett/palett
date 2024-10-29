import { E3, round } from '@aryth/math'

export const bd = (r, g, b) => {
  let hi = r, lo = r
  if (g > r) { hi = g } else { lo = g }
  if (b > hi) hi = b
  if (b < lo) lo = b
  return { max: hi, sum: hi + lo, dif: hi - lo }
}

export const hue = (r, g, b, max, dif) => {
  if (dif === 0) return 0
  switch (max) {
    case r:
      return ((g - b) / dif + ((g < b) ? 6 : 0)) % 6
    case g:
      return (b - r) / dif + 2
    case b:
      return (r - g) / dif + 4
  }
}


