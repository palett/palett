import { RGB } from '../RGB'

export const intToRgb = n => new RGB(n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF)