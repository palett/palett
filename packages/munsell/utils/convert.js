import { Polar } from '@aryth/polar'

export const hslToPolar = ([ h, _, l ]) => new Polar(l, h)
export const polarToHsl = (polar, s) => [ polar.th, s, polar.r ]