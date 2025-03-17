// - If `lo` is negative, the code adjusts `lo` by adding `len` and processes from there to the end, then from the start to `hi`.
// - If `hi` is greater than `len`, it processes from `lo` to the end, then from the start to `hi - len`.
// - Otherwise, it just processes from `lo` to `hi`.

export function circSlice([ lo, hi ]) {
  const len = this.length
  // Normalize indices to positive values within [0, len)
  if ((lo %= len) < 0) lo += len
  if ((hi %= len) < 0) hi += len
  return lo < hi
    ? this.slice(lo, hi)
    : this.slice(lo).concat(this.slice(0, hi))
}