export function assign(lo, df, ...args) {
  let i = 0, v
  while (i < df) this[lo++] = (v = args[i++])
  return this
}

// this[lo++] = h1
// this[lo++] = s1
// this[lo++] = l1
// this[lo++] = h2
// this[lo++] = s2
// this[lo++] = l2
// return this

export function leap(lo, df) {
  const vec = Array(df)
  let i = 0
  while (i < df) vec[i++] = this[lo++]
  return vec
}
