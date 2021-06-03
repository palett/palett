// export const diluteHex = (hex, hi) => {
//   hi = hi || hex.length
//   let x = ''
//   for (let i = 0, n; i < hi; i++) {
//     n = hex[i]
//     x += n + n
//   }
//   // for (let c of hex) x += c + c
//   return x
// }

export const diluteHex = (hex3) => {
  const [ r, g, b ] = hex3
  return r + r + g + g + b + b
}
