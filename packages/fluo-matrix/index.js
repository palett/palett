import { arrToPres, Fluo } from '@palett/fluo'

export { fluoMatrix } from './src/fluoMatrix'

export function fluoByRows(matrix, pres) {
  if (!matrix?.length || !pres) return matrix
  if (Array.isArray(pres)) pres = arrToPres(pres)
  return Fluo.rows(matrix, pres, this?.mutate, this?.colorant)
}
export function fluoByColumns(matrix, pres) {
  if (!matrix?.length || !pres) return matrix
  if (Array.isArray(pres)) pres = arrToPres(pres)
  return Fluo.columns(matrix, pres, this?.mutate, this?.colorant)
}
export function fluoByPoints(matrix, pres, width) {
  if (!matrix?.length || !pres) return matrix
  if (Array.isArray(pres)) pres = arrToPres(pres)
  return Fluo.matrix(matrix, pres, width, this?.mutate, this?.colorant)
}

