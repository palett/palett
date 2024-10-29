import { boundaries }           from '@aryth/bound-vector'
import { oneself }              from '@ject/oneself'
import { hslToHex }             from '@palett/convert'
import { COLOR, MAKER, RENDER } from '@palett/enum-colorant-modes'
import { PresetCollection }     from '@palett/fluo'
import { Proj }                 from '@palett/projector'
import { valid }                from '@typen/nullish'
import { mapper, mutate }       from '@vect/vector-mapper'

export function fluoVector(vec, presets) {
  if (!vec?.length) return []
  if (presets?.length && !presets[0]?.by) PresetCollection.prototype.setBound.call(presets)
  function makeProjectors(vec, presetCollection = []) {
    const [ cX, cY ] = presetCollection
    const [ bX, bY ] = boundaries(vec, presetCollection)
    const [ pX, pY ] = [ Proj.from(bX, cX), Proj.from(bY, cY) ]
    return [ [ bX, pX ], [ bY, pY ] ]
  }
  const projectors = makeProjectors(vec, presets)
  const to = this?.mutate ? mutate : mapper
  switch (this?.colorant) {
    case COLOR:
      return to(vec, Factory.into(projectors))
    case MAKER:
      return to(vec, Factory.make(projectors))
    case RENDER:
    default:
      return to(vec, Factory.render(projectors))
  }
}

export class Factory {
  static into([ [ bX, pX ], [ bY, pY ] ]) {
    function toHex(hsl) { return hsl ? hslToHex(hsl) : null }
    return (_, i) => {
      let v
      if (valid(v = bX && bX[i])) { return toHex(pX.into(v)) }
      if (valid(v = bY && bY[i])) { return toHex(pY.into(v)) }
      return null
    }
  }
  static make([ [ bX, pX ], [ bY, pY ] ]) {
    return (_, i) => {
      let v
      if (valid(v = bX && bX[i])) { return pX.make(v) }
      if (valid(v = bY && bY[i])) { return pY.make(v) }
      return (pX || pY)?.make(pX.nap) ?? oneself
    }
  }
  static render([ [ bX, pX ], [ bY, pY ] ]) {
    return (n, i) => {
      let v
      if (valid(v = bX && bX[i])) { return pX.render(v, n) }
      if (valid(v = bY && bY[i])) { return pY.render(v, n) }
      return (pX || pY)?.render(pX.nap, n) ?? n
    }
  }
}