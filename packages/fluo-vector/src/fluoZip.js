import { bound }                  from '@aryth/bound-vector'
import { dyezip }                 from '@palett/util-fluo'
import { mutazip, zipper as zip } from '@vect/vector'

export const fluoZip = function (
  vector,
  values,
  xPreset,
  yPreset,
) {
  const {
    mutate = false,
    colorant = false,
  } = this
  const zipper = mutate ? mutazip : zip
  return dyezip.call({ colorant, zipper, bound }, vector, values, xPreset, yPreset)
}
