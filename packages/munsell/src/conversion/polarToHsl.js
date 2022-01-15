import { HSL } from '../types/HSL'

export const polarToHsl = (polar, s) => new HSL(polar.th, s, polar.r)