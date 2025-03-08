export const bd = (r, g, b) => {
  let hi = r, lo = r
  if (g > r) { hi = g } else { lo = g }
  if (b > hi) hi = b
  if (b < lo) lo = b
  return { max: hi, sum: hi + lo, dif: hi - lo }
}