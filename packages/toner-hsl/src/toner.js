const constraint = (x, min, max) => x > max ? max : x < min ? min : x

export const toner = (hsl, dh, ds, dl) => {
  hsl[0] = constraint(hsl[0] + dh, 0, 360)
  hsl[1] = constraint(hsl[1] + ds, 0, 100)
  hsl[2] = constraint(hsl[2] + dl, 0, 100)
  return hsl
}
