export function assign(lo, df, ...args) {
  let i = 0, v
  while (i < df) this[lo++] = (v = args[i++])
  return this
}

export function onto3(i, x, y, z) {
  this[i++] = x
  this[i++] = y
  this[i++] = z
  return this
}

export function onto6(i, a, b, c, d, e, f) {
  this[i++] = a
  this[i++] = b
  this[i++] = c
  this[i++] = d
  this[i++] = e
  this[i++] = f
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
