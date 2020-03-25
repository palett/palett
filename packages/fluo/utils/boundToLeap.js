/**
 *
 * @param {Object} bound
 * @param {number} [bound.min] - if min: if dif, return {min,dif}; if max, return calculated {min,dif}
 * @param {number} [bound.dif] - if dif: if max, return calculated {min,dif}; else return {min:0,dif}
 * @param {number} [bound.max] - if max: return {min:0,dif:max}; else return {min:0,dif:0}
 * @return {{dif: number, min: number}}
 */
export const boundToLeap = bound => {
  let { min, max, dif } = bound
  if (pass(min)) {
    if (pass(dif)) return { min, dif }
    if (pass(max)) return { min, dif: max - min }
  }
  if (pass(dif)) {
    if (pass(max)) return { min: max - dif, dif }
    return { min: 0, dif }
  }
  if (pass(max)) return { min: 0, dif: max }
  return { min: 0, dif: 0 }
}

const pass = x => x !== void 0 && x !== null

// const MIN = 'min', DIF = 'dif', MAX = 'max'
// export const boundToLeapDev = b => {
//   let min, max, dif
//   if (MIN in b) {
//     if (DIF in b) return { min, dif } = b, { min, dif }
//     if (MAX in b) return { min, max } = b, { min, dif: max - min }
//   }
//   if (DIF in b) {
//     if (MAX in b) return { max, dif } = b, { min: max - dif, dif }
//     return { dif } = b, { min: 0, dif }
//   }
//   if (MAX in b) return { max } = b, { min: 0, dif: max }
//   return { min: 0, dif: 0 }
// }
