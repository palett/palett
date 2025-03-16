import { serialMatrix } from '@spare/serial'
import { width }        from '@vect/matrix-index'

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

export function fluoMatrix(matrix, direct, presm) {
  presm = presm ?? this
  if (!matrix?.length || !presm) return matrix
  const serial = serialMatrix.call(presm, direct)
  return unflattenVector(serial, width(matrix))
}

export function fluoByRows(matrix, presm) {
  presm = presm ?? this
  if (!matrix?.length || !presm) return matrix
  const serial = serialMatrix.call(presm, ROWWISE)
  return unflattenVector(serial, width(matrix))
}
export function fluoByColumns(matrix, presm) {
  presm = presm ?? this
  if (!matrix?.length || !presm) return matrix
  const serial = serialMatrix.call(presm, COLUMNWISE)
  return unflattenVector(serial, width(matrix))
}
export function fluoByPoints(matrix, presm, width) {
  presm = presm ?? this
  if (!matrix?.length || !presm) return matrix
  const serial = serialMatrix.call(presm, POINTWISE)
  return unflattenVector(serial, width(matrix))
}

