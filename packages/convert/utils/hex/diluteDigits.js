export function dil2(hex) {
  const hi = hex.length
  if (hi >= 2) return hex
  if (hi === 1) return '0' + hex
  if (hi <= 0) return '00'
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