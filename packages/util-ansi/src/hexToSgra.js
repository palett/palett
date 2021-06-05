import { hexToInt } from '@palett/convert'

export const hexToForeSgra = hex => {
  if (!hex?.length) return ''
  const n = hexToInt(hex)
  const r = n >> 16 & 0xff, g = n >> 8 & 0xff, b = n & 0xff
  return `38;2;${ r };${ g };${ b }`
}

export const hexToBackSgra = hex => {
  if (!hex?.length) return ''
  const n = hexToInt(hex)
  const r = n >> 16 & 0xff, g = n >> 8 & 0xff, b = n & 0xff
  return `48;2;${ r };${ g };${ b }`
}