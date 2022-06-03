import { boundaries }           from '@aryth/bound-vector'
import { oneself }              from '@ject/oneself'
import { hslToHex }             from '@palett/convert'
import { COLOR, MAKER, RENDER } from '@palett/enum-colorant-modes'
import { Proj }                 from '@palett/projector'
import { valid }                from '@typen/nullish'
import { mapper, mutate }       from '@vect/vector-mapper'

export function fluoVector(vec, presets) {
  if (!vec?.length) return []
  function makeProjectors(vec, presetCollection = []) {
    const [cX, cY] = presetCollection
    const [bX, bY] = boundaries(vec, presetCollection)
    const [pX, pY] = [Proj.from(bX, cX), Proj.from(bY, cY)]
    return [[bX, pX], [bY, pY]]
  }
  const projectors = makeProjectors(vec, presets)
  const to = this?.mutate ? mutate : mapper
  switch (this?.colorant) {
    case COLOR:
      return to(vec, Thrust.into(projectors))
    case MAKER:
      return to(vec, Thrust.make(projectors))
    case RENDER:
      return to(vec, Thrust.render(projectors))
    default:
      return to(vec, Thrust.render(projectors))
  }
}

export class Thrust {
  static into([[bX, pX], [bY, pY]]) {
    function toHex(hsl) { return hsl ? hslToHex(hsl) : null }
    return (_, i) => {
      let v
      if (valid(v = bX && bX[i])) { return pX.into(v)|> toHex }
      if (valid(v = bY && bY[i])) { return pY.into(v)|> toHex }
      return null
    }
  }
  static make([[bX, pX], [bY, pY]]) {
    return (_, i) => {
      let v
      if (valid(v = bX && bX[i])) { return pX.make(v) }
      if (valid(v = bY && bY[i])) { return pY.make(v) }
      return (pX || pY)?.make(pX.nap) ?? oneself
    }
  }
  static render([[bX, pX], [bY, pY]]) {
    return (n, i) => {
      let v
      if (valid(v = bX && bX[i])) { return pX.render(v, n) }
      if (valid(v = bY && bY[i])) { return pY.render(v, n) }
      return (pX || pY)?.render(pX.nap, n) ?? n
    }
  }
}