import { valid } from '@typen/nullish'

/**
 *
 * @param {Object} bound
 * @param {number} [bound.min] - if min: if dif, return {min,dif}; if max, return calculated {min,dif}
 * @param {number} [bound.dif] - if dif: if max, return calculated {min,dif}; else return {min:0,dif}
 * @param {number} [bound.max] - if max: return {min:0,dif:max}; else return {min:0,dif:0}
 * @return {{dif: number, min: number}}
 */
export const parseBound = bound => {
  // if (!bound) return { min: 0, dif: 0 }
  let { min, max, dif } = bound
  if (valid(min)) {
    if (valid(dif)) return { min, dif }
    if (valid(max)) return { min, dif: max - min }
  }
  if (valid(dif)) {
    if (valid(max)) return { min: max - dif, dif }
    return { min: 0, dif }
  }
  if (valid(max)) return { min: 0, dif: max }
  return { min: 0, dif: 0 }
}
