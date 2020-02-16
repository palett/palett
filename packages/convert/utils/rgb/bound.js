export const bound = ([r, g, b]) => {
  let ma = r, mi = r
  if (g > r) { ma = g } else { mi = g }
  if (b > ma) ma = b
  if (b < mi) mi = b
  return {
    max: ma,
    sum: ma + mi,
    dif: ma - mi
  }
}
