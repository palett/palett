export const dilhex = (hex, hi) => {
  hi = hi || hex.length
  let x = ''
  for (let i = 0, el; i < hi; i++) {
    el = hex[i]
    x += el + el
  }
  // for (let c of hex) x += c + c
  return x
}
