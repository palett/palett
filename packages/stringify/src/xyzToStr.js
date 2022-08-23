import { round } from '@aryth/math'

function pad(v) { return String(round(v)).padStart(3) }

export function xyzToStr(x, y, z) {
  return `[${pad(x)},${pad(y)},${pad(z)}]`
}