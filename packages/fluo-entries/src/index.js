import { serialEntries } from '@spare/serial'

function unflattenVector(vector, columnNumber) {
  const rows = []
  for (let i = 0; i < vector.length; i += columnNumber) {
    rows.push(vector.slice(i, i + columnNumber))
  }
  return rows
}


/**
 * @param {[*,*][]}  entries
 * @param {Presm} presm
 * @returns {[string,string][]}
 */
export function fluoEntries(entries, presm) {
  presm = presm ?? this
  if (!entries?.length || !presm) return entries
  if (!presm) return entries
  const serial = serialEntries.call(presm, entries)
  return unflattenVector(serial, 2)
}

