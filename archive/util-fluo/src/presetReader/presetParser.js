import { presetToFlat } from './presetToFlat'
import { presetToLeap } from './presetToLeap'

/**
 *
 * @param preset
 * @return {{someDif: boolean, dye:Function, leap:{min:*[],dif:*[]}}}
 */
export const presetParser = preset => {
  const leap = preset |> presetToLeap
  return {
    leap,
    dye: preset |> presetToFlat,
    someDif: leap.dif.some(n => n)
  }
}
