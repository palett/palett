import { Polar } from '@aryth/polar'
import { HSL }   from '../src/types/HSL'

export const hslToPolar = ([ h, _, l ]) => new Polar(l, h)
export const polarToHsl = (polar, s) => new HSL(polar.θ, s, polar.r)