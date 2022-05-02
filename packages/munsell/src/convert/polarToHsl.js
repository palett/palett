import { HSL } from '../HSL'

export const polarToHsl = (polar, s) => new HSL(polar.th, s, polar.r)
// export const hslToPolar = ([ h, _, l ]) => new Polar(l, h)
// export const polarToHsl = (polar, s) => new HSL(polar.θ, s, polar.r)