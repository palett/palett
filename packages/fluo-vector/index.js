import { intoPres } from '@palett/fluo'
import { Node }     from '@spare/node'
// export function fluoVector(vec, pres) {
//   if (!vec?.length) return []
//   if (!pres) return vec
//   if (Array.isArray(pres)) pres = arrToPres(pres)
//   return (new Fluo(pres)).project(vec, wd, this?.mode, this?.mutate)
// }

export function fluoVector(vec, pres) {
  if (!vec?.length) return []
  if (!pres) return vec
  const node = (new Node({}, intoPres(pres)))
  return node.flatVector(vec)
}
