import { limitAboveZero, restrictAboveZero } from '@aryth/math'

export const toner = (hsl, dh, ds, dl) => {
  if (dh) hsl[0] = restrictAboveZero(hsl[0] + dh, 360)
  if (ds) hsl[1] = limitAboveZero(hsl[1] + ds, 100)
  if (dl) hsl[2] = limitAboveZero(hsl[2] + dl, 100)
  return hsl
}
