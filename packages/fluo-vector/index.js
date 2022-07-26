import { Fluo }      from '@palett/fluo'
import { arrToPres } from '@palett/fluo'

export function fluoVector(vec, pres, wd) {
  if (!vec?.length) return []
  if (!pres) return vec
  if (Array.isArray(pres)) pres = arrToPres(pres)
  return (new Fluo(pres)).project(vec, wd, this?.mode, this?.mutate)
}
