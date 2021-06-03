export const bound = ([ r, g, b ]) => {
  let ma = r, mi = r
  if (g > r) { ma = g }
  else { mi = g }
  if (b > ma) ma = b
  if (b < mi) mi = b
  return {
    max: ma,
    sum: ma + mi,
    dif: ma - mi
  }
}

export const hue = (r, g, b, max, dif) => {
  if (dif === 0) return 0
  switch (max) {
    case r:
      return ( ( g - b ) / dif + ( ( g < b ) ? 6 : 0 ) ) % 6
    case g:
      return ( b - r ) / dif + 2
    case b:
      return ( r - g ) / dif + 4
  }
}


