import * as math         from '@aryth/math'
import { distance as d } from '@aryth/polar'

const { abs } = Math
// 
export function relative(hsl, it) {
  return [ d(hsl.h, it.h), abs(hsl.s - it.s), abs(hsl.l - it.l) ]
}

// float
export function distance(hsl, sub) {
  const [ h, s, l ] = relative(hsl, sub)
  return h + s + l
}

// bool
export function almostEqual(hsl, sub, epsilon) {
  return d(hsl.h, sub.h) < epsilon.h && abs(hsl.s - sub.s) < epsilon.s && abs(hsl.l - sub.l) < epsilon.l
}

// bool
export function almostEqualByPolar(hsl, polar, polarEpsilon, saturationInterval) {
  return math.almostEquals(hsl.h, polar.θ, polarEpsilon.θ) &&
    saturationInterval.min <= hsl.s && hsl.s <= saturationInterval.max &&
    math.almostEquals(hsl.l, polar.r, polarEpsilon.r)
}
