import { isNumeric } from '@palett/util-fluo'

export const someNumeric = ar => ar.some(isNumeric)

export const allString = ar => ar.every(x => typeof x === 'string')

export const allNAString = ar =>
  Array.isArray(ar) && !someNumeric(ar) && allString(ar)

// if (!(ar |> Array.isArray)) return false
// if (ar |> someNumeric) return false
// return (ar |> allString)
