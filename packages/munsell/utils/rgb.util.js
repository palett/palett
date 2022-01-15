const { abs } = Math
// 
export function relative(rgb, it) {
  return (abs(rgb.r - it.r), abs(rgb.g - it.g), abs(rgb.b - it.b))
}


// int
export function distance(rgb, sub) {
  const [ r, g, b ] = rgb.relative(sub)
  return r + g + b
}


// bool
export function almostEqual(rgb, sub, epsilon) {
  return abs(rgb.r - sub.r) < epsilon.r && abs(rgb.g - sub.g) < epsilon.g && abs(rgb.b - sub.b) < epsilon.b
}
