import { serialVector } from '@spare/serial';

// export function fluoVector(vec, pres) {
//   if (!vec?.length) return []
//   if (!pres) return vec
//   if (Array.isArray(pres)) pres = arrToPres(pres)
//   return (new Fluo(pres)).project(vec, wd, this?.mode, this?.mutate)
// }

function fluoVector(vec, presm) {
  presm = presm ?? this;
  if (!vec?.length || !presm) return vec
  return serialVector.call(presm, vec)
}

export { fluoVector };
