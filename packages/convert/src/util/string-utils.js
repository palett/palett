// For digits 0-9 (ASCII 48-57), subtract 48 to get the value
// For letters a-f (ASCII 97-102) or A-F (ASCII 65-70), add 9 to get number from 10 to 15
export function hexAt(tx, i) {
  const n = tx.charCodeAt(i)
  return (n >> 5) <= 1 ? n & 0xf : (n & 0x7) + 9
}

export function ff(tx, i) {
  let a = tx.charCodeAt(i), b = tx.charCodeAt(++i)
  a = (a >> 5) <= 1 ? a & 0xF : (a & 0x7) + 9
  b = (b >> 5) <= 1 ? b & 0xF : (b & 0x7) + 9
  return a << 4 | b // a * 16 + b
}

export const prolif = n => n << 4 | n

export function dil2(hex) {
  const hi = hex?.length
  if (hi >= 2) return hex
  if (hi === 1) return '0' + hex
  if (hi <= 0) return '00'
}

export function dil6(hex) {
  const hi = hex?.length
  if (hi >= 6) return hex
  if (hi === 5) return '0' + hex
  if (hi === 4) return '00' + hex
  if (hi === 3) return '000' + hex
  if (hi === 2) return '0000' + hex
  if (hi === 1) return '00000' + hex
  if (hi <= 0) return '000000'
}

