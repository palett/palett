import { limitAboveZero as lim0Up, restrictAboveZero as rec0Up } from '@aryth/math'
import { hexToHsl, hslToHex, hslToRgb, rgbToHsl }                from '@palett/convert'

export function toneHex(hex, dh, ds, dl) {
  let hsl = hexToHsl(hex)
  toneHsl(hsl, dh, ds, dl)
  return hslToHex(hsl)
}

export function toneHsl(hsl, dh, ds, dl) {
  if (dh) hsl[0] = rec0Up(hsl[0] + dh, 360)
  if (ds) hsl[1] = lim0Up(hsl[1] + ds, 100)
  if (dl) hsl[2] = lim0Up(hsl[2] + dl, 100)
  return hsl
}

export function toneRgb(rgb, dh, ds, dl) {
  let hsl = rgbToHsl(rgb)
  toneHsl(hsl, dh, ds, dl)
  return hslToRgb(hsl)
}
