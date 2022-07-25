export { NL } from './resources/BOUND_CONF'

export const extractBound = (objectWithBound) => objectWithBound
  ? { max: objectWithBound.max, min: objectWithBound.min }
  : null

// export function initialize(pres) {
//
// }
