import { STR }       from '@typen/enum-data-types'
import { isNumeric } from '@typen/num-strict'

export const someNumeric = ar => ar.some(isNumeric)

export const everyString = ar => ar.every(x => typeof x === STR)

export const allStr = ar =>
  Array.isArray(ar) && !someNumeric(ar) && everyString(ar)

// if (!(ar |> Array.isArray)) return false
// if (ar |> someNumeric) return false
// return (ar |> everyString)
