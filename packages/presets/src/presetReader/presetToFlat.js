import { oneself }  from '@ject/oneself'
import { hslToDye } from './hslToDye'
import { parseHsl } from './parseHsl'

/**
 * @param {Object} [preset]
 * @param {string} preset.na
 * @return {Function}
 */
export const presetToFlat = (preset) => {
  if (!preset) return oneself
  const na = preset.na
  return na |> parseHsl |> hslToDye
}
