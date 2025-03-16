import { serialEntries, serialMatrix, serialVector } from '@spare/serial'
import { width }                                     from '@vect/matrix-index'

const POINTWISE = 0
const ROWWISE = 1
const COLUMNWISE = 2

function unflattenVector(vector, columnNumber) {
  const rows = []
  for (let i = 0; i < vector.length; i += columnNumber) {
    rows.push(vector.slice(i, i + columnNumber))
  }
  return rows
}

export class Fluo {
  static vector(vec, presm) {
    presm = presm ?? this
    if (!vec?.length || !presm) return []
    return serialVector.call(presm, vec)
  }
  static entries(entries, presm) {
    presm = presm ?? this
    if (!entries?.length || !presm) return entries
    const serial = serialEntries.call(presm, entries)
    return unflattenVector(serial, 2)
  }
  static rows(matrix, pres) {
    pres = pres ?? this
    if (!matrix?.length || !pres) return matrix
    const serial = serialMatrix.call(pres, ROWWISE)
    return unflattenVector(serial, width(matrix))
  }
  static columns(matrix, pres) {
    pres = pres ?? this
    if (!matrix?.length || !pres) return matrix
    const serial = serialMatrix.call(pres, COLUMNWISE)
    return unflattenVector(serial, width(matrix))
  }
  static matrix(matrix, pres, width) {
    pres = pres ?? this
    if (!matrix?.length || !pres) return matrix
    const serial = serialMatrix.call(pres, POINTWISE)
    return unflattenVector(serial, width(matrix))
  }
}