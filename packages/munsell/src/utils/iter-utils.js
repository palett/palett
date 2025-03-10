export function circ(lo, hi, proc) {
  const vec = this
  const len = vec.length
  if (lo < hi) {
    if (lo < 0) { // [-30, 30]
      for (let i = lo + len; i < len; i++) proc(vec[i], i)
      for (let i = 0; i < hi; i++) proc(vec[i], i)
      return void 0
    }
    if (hi > len) { // [330, 390]
      for (let i = lo; i < len; i++) proc(vec[i], i)
      for (let i = 0; i < hi - len; i++) proc(vec[i], i)
      return void 0
    }
    { // [120, 180]
      for (let i = lo; i < hi; i++) proc(vec[i], i)
      return void 0
    }
  } else { // [330, 30]
    for (let i = lo; i < len; i++) proc(vec[i], i)
    for (let i = 0; i < hi; i++) proc(vec[i], i)
    return void 0
  }
}