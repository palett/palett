import { oneself }  from '@ject/oneself'
import { hexToRgb } from '@palett/convert'
import { Dye }      from '@palett/dye'

/**
 * @param {Object} [preset]
 * @param {string} preset.na
 * @return {Function}
 */
export const presetToFlat = (preset) => {
  return !preset ? oneself : (preset.na  |> hexToRgb|> Dye)
}
