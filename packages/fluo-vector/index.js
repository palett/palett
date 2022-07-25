import { SUBTLE } from '@palett/presets'
import { Fluo }   from './src/Fluo.js'

export { Fluo } from './src/Fluo.js'

export function arrToPres(arr) {
  switch (arr.length) {
    case 0:
      return { pos: SUBTLE, neg: SUBTLE, str: SUBTLE }
    case 1:
      return { pos: arr[0], neg: arr[0], str: arr[0] }
    case 2:
      return { pos: arr[0], neg: arr[0], str: arr[1] }
    case 3:
    default:
      return { pos: arr[0], neg: arr[1], str: arr[2] }
  }
}

export function fluoVector(vec, pres, wd) {
  if (!vec?.length) return []
  if (Array.isArray(pres)) pres = arrToPres(pres)
  const fluo = new Fluo(pres)
  return fluo.project(vec, wd, this?.mode, this?.mutate)
}
