export function hexAt(tx, i) {
  let n = tx.charCodeAt(i)
  return ( n >> 5 ) <= 1 ? n & 0xf : ( n & 0x7 ) + 9
}

export const prolif = n => n << 4 | n

export function dil2(hex) {
  const hi = hex.length
  if (hi >= 2) return hex
  if (hi === 1) return '0' + hex
  if (hi <= 0) return '00'
}

export function dil3(hex) {
  const hi = hex.length
  if (hi >= 3) return hex
  if (hi === 2) return '0' + hex
  if (hi === 1) return '00' + hex
  if (hi <= 0) return '000'
}


export function dil6(hex) {
  const hi = hex.length
  if (hi >= 6) return hex
  if (hi === 5) return '0' + hex
  if (hi === 4) return '00' + hex
  if (hi === 3) return '000' + hex
  if (hi === 2) return '0000' + hex
  if (hi === 1) return '00000' + hex
  if (hi <= 0) return '000000'
}

export const diluteHex = (hex3) => {
  const [ r, g, b ] = hex3
  return r + r + g + g + b + b
}