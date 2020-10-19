export { NL } from './resources/BOUND_CONF'

export const extractBound = (objectWithBound) => {
  return objectWithBound ? {
    max: objectWithBound.max,
    min: objectWithBound.min
  } : null
}
