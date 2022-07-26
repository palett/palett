import { STR } from '@typen/enum-data-types'

export function column(y, h) {
  let mx = this, hi = 0, col = Array(h ?? (h = this?.length))
  for (let i = 0, wd; i < h; i++) {
    const x = mx[i][y]
    if (typeof x === STR && (wd = x.length)) { if (wd > hi) hi = wd }
    col[i] = x
  }
  col.wd = hi
  return col
}