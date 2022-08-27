import { distance as d } from '@aryth/polar'

const { abs } = Math
// 
export function relative(hsl, it) {
  return [ d(hsl.h, it.h), abs(hsl.s - it.s), abs(hsl.l - it.l) ]
}

// float
export function distance(hsl, hsl2) {
  const [ h, s, l ] = relative(hsl, hsl2)
  return h + s + l
}

// bool
export function almostEqual(hsl, hsl2, epsilon) {
  return d(hsl.h, hsl2.h) < epsilon.h && abs(hsl.s - hsl2.s) < epsilon.s && abs(hsl.l - hsl2.l) < epsilon.l
}
