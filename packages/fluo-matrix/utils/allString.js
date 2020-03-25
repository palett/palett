import { isNumeric } from '@typen/num-strict'
import { every, some } from '@vect/matrix'

const allString = mx => every(mx, x => typeof x === 'string')
const someNumeric = mx => some(mx, isNumeric)

export const allNAString = mx =>
  !someNumeric(mx) && allString(mx)




