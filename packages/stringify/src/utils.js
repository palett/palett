import { round }                        from '@aryth/math'
import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'

function padN3(v) { return String(round(v)).padStart(3) }

function padD1(v) { return (v >= 100 ? round(v).toFixed(0) : v.toFixed(1)).padStart(4) }

export function xyzToStr(x, y, z) {
  return `[${padN3(x)},${padN3(y)},${padN3(z)}]`
}

export function hslToStr(x, y, z) {
  return `[${padN3(x)},${padD1(y)},${padD1(z)}]`
}

export const HEAD = CSI + '1;' + FORE_INI + SC
export const TAIL = CSI + FORE_DEF + '21;' + SGR
export function render(r, g, b, text) {
  const h = this?.head ?? HEAD, t = this?.tail ?? TAIL
  return h + r + SC + g + SC + b + SGR + text + t
}